import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {friendsActionTypes} from '../type/index';
import {
    LoadFriends,
    ErrorsFriends,
    GetFriend,
    SetFriendDescription,
} from '../action';
import {ofType} from '@ngrx/effects';
import {FriendsService} from '../../service/friends.service';
import {ErrorMessage} from '../../class/errors';

@Injectable()
export class LoadFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {
    }

    @Effect()
    getFriends$: Observable<Action> = this.actions$.pipe(
        ofType<any>(
            friendsActionTypes.GET_FRIENDS,
            friendsActionTypes.SORT_FRIENDS,
            friendsActionTypes.SEARCH_FRIENDS
        ),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            const params = {...store.configsFriends, ...action.payload};

            return this.friendsService
                .getFriends(params)
                .pipe(
                    map(friends => {
                        let errors = null;

                        friends = friends || [];

                        if (friends && friends.length > 0) {
                            if (params.startView > 0) {
                                friends = [...store.friends, ...friends];
                            }
                            params.startView = params.startView + params.limitView;
                        } else {
                            if (params.startView > 0) {
                                friends = [...store.friends];
                            } else {
                                if (params.searchValue) {
                                    errors = new ErrorMessage('info', 'errorMessage.searchEmpty');
                                } else if (params.showBookmark) {
                                    errors = new ErrorMessage('info', 'errorMessage.bookmarkEmpty');
                                } else {
                                    errors = new ErrorMessage('info', 'errorMessage.friendsEmpty');
                                }
                            }
                        }

                        return new LoadFriends(
                            {configsFriends: params, friends: friends, errors: errors}
                        );
                    }),
                    catchError(error => {
                        return of(new ErrorsFriends(new ErrorMessage('danger', 'errorMessage.friendsEmpty')));
                    })
                );
        })
    );

    @Effect()
    getFriend$ = this.actions$.pipe(
        ofType<GetFriend>(
            friendsActionTypes.GET_FRIEND
        ),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            return this.friendsService
                .getFriend(action.payload)
                .pipe(
                    map(friend => {
                        return new SetFriendDescription(friend);
                    }),
                    catchError(error => {
                        return of(new ErrorsFriends(new ErrorMessage('danger', 'errorMessage.networkConnect')));
                    })
                );
        })
    );
}
