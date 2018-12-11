import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {friendsActionTypes} from '../../type/store/action';
import {LoadFriends, SortFriends, GetFriends, SetCountBookmarksFriends} from '../action';
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
        // todo нужно взять данные из селекта
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            const params = {...store.configsFriends, ...action.payload};

            return this.friendsService
                .getFriends(params)
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
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            const params = {...store.configsFriends, ...{typeSort: action.payload}};

            console.log('params', params);

            return this.friendsService
                .getFriends(params)
                .pipe(
                    map(friends => new LoadFriends(friends))
                );
        })
    );
}


@Injectable()
export class GetCountBookmarksFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    GetCountBookmarskFriends$: Observable<Action> = this.actions$.pipe(
        ofType<SortFriends>(friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            return this.friendsService
                .getCountBookmarskFriends()
                .pipe(
                    map(count => new SetCountBookmarksFriends(count))
                );
        })
    );
}
