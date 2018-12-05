import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {friendsActionTypes} from '../../type/store/action';
import {LoadFriends, SortFriends, GetFriends} from '../action';
import {ofType} from '@ngrx/effects';
import {FriendsService} from '../../service/friends.service';
import {Friend} from '../../class/friends';

@Injectable()
export class LoadFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    getFriends$: Observable<Action> = this.actions$.pipe(
        ofType<GetFriends>(friendsActionTypes.GET_FRIENDS),
        switchMap(() => {
            return this.friendsService
                .getFriends()
                .pipe(
                    map(friends => new LoadFriends(friends))
                );
        })
    );
}

@Injectable()
export class SortFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    getSortFriends$: Observable<Action> = this.actions$.pipe(
        ofType<SortFriends>(friendsActionTypes.SORT_FRIENDS),
        switchMap((action) => {
            return this.friendsService.loadFriends(action.payload);
        }),
        switchMap((friends: Friend[]) => {
            console.log('friends', friends);
            return [{
                type : friendsActionTypes.LOAD_FRIENDS,
                payload: friends
            }];
        })
    );
}
