import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FriendsService} from '../../service/friends.service';
import {TestBed} from '@angular/core/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable, of} from 'rxjs';
import {Friend} from '../../class/friends';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {provideMockActions} from '@ngrx/effects/testing';
import {
    BookmarksFriends,
    GetCountBookmarksFriends,
    GetFriends,
    LoadFriends,
    SetCountBookmarksFriends,
    ShowBookmarksFriends
} from '../action';
import {BookmarkFriendsEffect} from './bookmarkFriends.effect';

describe('BookmarkFriendsEffect', () => {

    describe('Bookmarks friends', () => {

        const mockStore = {
            friends: {
                friends: [new Friend('1', 'first_name', 'last_name')],
                configsFriends: {typeSort: 0, searchValue: '', showBookmark: false, startView: 0, limitView: 0},
                errors: null,
                bookmarks: {
                    count: 0
                }
            }
        };

        const countBookmarskFriends = 1;

        const mockFriendsService = {
            getFriends: function (): Observable<Friend[]> {
                return of(mockStore.friends.friends);
            },
            getFriend: function (): Observable<Friend> {
                return of(mockStore.friends.friends[0]);
            },
            setBookmark: function (): void {

            },
            getCountBookmarksFriends: function (): Observable<number>  {
                return of(countBookmarskFriends);
            },
            getFilterBookmark: function (): Friend[]  {
                return mockStore.friends.friends;
            }
        };

        let effects: BookmarkFriendsEffect;
        let metadata: EffectsMetadata<BookmarkFriendsEffect>;
        let actionsMarble: Observable<any>;

        let store: MockStore<any>;
        const initialState = mockStore;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientModule
                ],
                providers: [
                    BookmarkFriendsEffect,
                    {provide: FriendsService, useValue: mockFriendsService},
                    provideMockStore({initialState}),
                    provideMockActions(() => actionsMarble)
                ]
            });

            effects = TestBed.get(BookmarkFriendsEffect);
            metadata = getEffectsMetadata(effects);
            store = TestBed.get(Store);
        });

        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should be get count bookmark', () => {
            const action = new GetCountBookmarksFriends();
            const completion = new SetCountBookmarksFriends(countBookmarskFriends);

            actionsMarble = cold('--a-', {a: action});
            const expected = cold('--b', {b: completion});

            expect(effects.GetCountBookmarksFriends$).toBeObservable(expected);
        });

        it('should be set bookmark for friend', () => {
            const action = new BookmarksFriends(mockStore.friends.friends[0]);
            actionsMarble = hot('--a-', {a: action});

            const expected = cold('--(c)', {
                c: new SetCountBookmarksFriends(0)
            });

            expect(effects.SetBookmarkFriends$).toBeObservable(expected);
        });

        it('should be show bookmark friends', () => {
            const action = new ShowBookmarksFriends(true);
            actionsMarble = hot('--a-', {a: action});

            const expected = cold('--(b)', {
                b: new GetFriends({showBookmark: true})
            });

            expect(effects.ShowBookmarkFriends$).toBeObservable(expected);
        });

        it('should register GetCountBookmarksFriends$ that dispatches an action', () => {
            expect(metadata.GetCountBookmarksFriends$).toEqual({dispatch: true, resubscribeOnError: true});
        });

        it('should register SetBookmarkFriends$ that dispatches an action', () => {
            expect(metadata.SetBookmarkFriends$).toEqual({dispatch: true, resubscribeOnError: true});
        });

        it('should register ShowBookmarkFriends$ that dispatches an action', () => {
            expect(metadata.ShowBookmarkFriends$).toEqual({dispatch: true, resubscribeOnError: true});
        });

    });

    describe('Bookmarks Friends on bookmarks page', () => {

        const mockStore = {
            friends: {
                friends: [new Friend('1', 'first_name', 'last_name')],
                configsFriends: {typeSort: 0, searchValue: '', showBookmark: true, startView: 0, limitView: 0},
                errors: null,
                bookmarks: {
                    count: 0
                }
            }
        };

        const mockStoreLoad = {
            friends: {
                friends: [new Friend('1', 'first_name', 'last_name')],
                // configsFriends: {typeSort: 0, searchValue: '', showBookmark: true, startView: 0, limitView: 0},
                // errors: null,
            }
        };

        const countBookmarskFriends = 1;

        const mockFriendsService = {
            getFriends: function (): Observable<Friend[]> {
                return of(mockStore.friends.friends);
            },
            getFriend: function (): Observable<Friend> {
                return of(mockStore.friends.friends[0]);
            },
            setBookmark: function (): void {

            },
            getCountBookmarksFriends: function (): Observable<number>  {
                return of(countBookmarskFriends);
            },
            getFilterBookmark: function (): Friend[]  {
                return mockStore.friends.friends;
            }
        };


        let effects: BookmarkFriendsEffect;
        let metadata: EffectsMetadata<BookmarkFriendsEffect>;
        let actionsMarble: Observable<any>;

        let store: MockStore<any>;
        const initialState = mockStore;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientModule
                ],
                providers: [
                    BookmarkFriendsEffect,
                    {provide: FriendsService, useValue: mockFriendsService},
                    provideMockStore({initialState}),
                    provideMockActions(() => actionsMarble)
                ]
            });

            effects = TestBed.get(BookmarkFriendsEffect);
            metadata = getEffectsMetadata(effects);
            store = TestBed.get(Store);
        });

        it('should be set bookmark', () => {
            const action = new BookmarksFriends(mockStore.friends.friends[0]);
            actionsMarble = hot('--a-', {a: action});

            const expected = cold('--(bc)', {
                b: new SetCountBookmarksFriends(0),
                c: new LoadFriends(mockStoreLoad.friends)
            });

            expect(effects.SetBookmarkFriends$).toBeObservable(expected);
        });

    });

});
