import {Store, StoreModule} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FriendsService} from '../../service/friends.service';
import {TestBed} from '@angular/core/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable, of} from 'rxjs';
import {Friend} from '../../class/friends';
import {FriendsAction} from '../type';
import {LoadFriendsEffect} from './loadFriends.effect';
import {Actions, EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {provideMockActions} from '@ngrx/effects/testing';
import {appReducer} from '../reducer';
import {GetFriends, LoadFriends} from '../action';
import {Friends} from '../../interface/friends';

describe('LoadFriendsEffect', () => {

    let effects: LoadFriendsEffect;
    let metadata: EffectsMetadata<LoadFriendsEffect>;
    let actions: Observable<Friends>;

    const moskStore = {friends: [new Friend('1', 'first_name', 'last_name')]};

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                LoadFriendsEffect,
                FriendsService,
                provideMockStore({ initialState }),
                provideMockActions(() => actions)
            ]
        });

        effects = TestBed.get(LoadFriendsEffect);
        metadata = getEffectsMetadata(effects);
        store = TestBed.get(Store);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should work', () => {
        const action = new GetFriends();
        const completion = new LoadFriends({friends: [new Friend('2', 'first_name', 'last_name')]});

        actions = hot('--a-', { a: action });
        const expected = cold('--b', { b: completion });

        // effects.getFriends$.subscribe((x) => {
        //     console.log('initialState!', x);
        // });

        // console.log('getFriends$', effects.getFriends$);

       // expect(effects.getFriends$).toBeObservable(expected);
    });

    // it('should work', () => {
    //     const action = new MyActions.ExampleAction();
    //     const completion = new MyActions.ExampleActionSuccess();
    //
    //     // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    //     actions = hot('--a-', { a: action });
    //     const expected = cold('--b', { b: completion });
    //
    //     expect(effects.someSource$).toBeObservable(expected);
    // });

    it('should register getFriends$ that dispatches an action', () => {
        expect(metadata.getFriends$).toEqual({ dispatch: true });
    });

    it('should register getFriend$ that dispatches an action', () => {
        expect(metadata.getFriend$).toEqual({ dispatch: true });
    });

});
