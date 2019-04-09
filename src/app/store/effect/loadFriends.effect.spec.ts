import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FriendsService} from '../../service/friends.service';
import {TestBed} from '@angular/core/testing';
import {cold} from 'jasmine-marbles';
import {Observable, of} from 'rxjs';
import {Friend} from '../../class/friends';
import {LoadFriendsEffect} from './loadFriends.effect';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {provideMockActions} from '@ngrx/effects/testing';
import {GetFriends, LoadFriends} from '../action';


describe('LoadFriendsEffect', () => {

    let effects: LoadFriendsEffect;
    let metadata: EffectsMetadata<LoadFriendsEffect>;
    let actionsMarble: Observable<any>;

    const moskStore = {
        friends: {
            friends: [new Friend('1', 'first_name', 'last_name')],
            configsFriends : {typeSort: 0, searchValue: '', showBookmark: false, startView: 0, limitView: 0},
            errors: null
        }
    };

    let store: MockStore<any>;
    const initialState = moskStore;

    const mockFriendsService = {
        getFriends: function(): Observable<Friend[]> {
            return of(moskStore.friends.friends);
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                LoadFriendsEffect,
                { provide: FriendsService, useValue: mockFriendsService },
                provideMockStore({ initialState }),
                provideMockActions(() => actionsMarble)
            ]
        });

       // actions = TestBed.get(Actions);
        effects = TestBed.get(LoadFriendsEffect);
        metadata = getEffectsMetadata(effects);
        store = TestBed.get(Store);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should work', () => {
        const action = new GetFriends();
        const completion = new LoadFriends(moskStore.friends);

        actionsMarble = cold('--a-', { a: action });
        const expected = cold('--b', { b: completion });

        expect(effects.getFriends$).toBeObservable(expected);
    });

    it('should register getFriends$ that dispatches an action',  () => {
        expect(metadata.getFriends$).toEqual({ dispatch: true });
    });

    it('should register getFriend$ that dispatches an action', () => {
        expect(metadata.getFriend$).toEqual({ dispatch: true });
    });

});
