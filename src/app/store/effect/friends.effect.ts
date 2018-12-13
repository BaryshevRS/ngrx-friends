import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, pluck, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {friendsActionTypes} from '../type/index';
import {
    LoadFriends,
    SortFriends,
    GetFriends,
    SetCountBookmarksFriends,
    SetBookmarkFriends,
    GetCountBookmarksFriends,
    ShowBookmarksFriends, SearchFriends
} from '../action';
import {ofType} from '@ngrx/effects';
import {FriendsService} from '../../service/friends.service';

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

            console.log('params!!', params);

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
            console.log('params typeSort', store.configsFriends);

            return this.friendsService
                .getFriends(params)
                .pipe(
                    map(friends => new LoadFriends(friends))
                );
        })
    );
}

@Injectable()
export class SearchFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    getSearchFriends$: Observable<Action> = this.actions$.pipe(
        ofType<SearchFriends>(friendsActionTypes.SEARCH_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            console.log('params search', store.configsFriends);

            return this.friendsService
                .getFriends(store.configsFriends)
                .pipe(
                    map(friends => new LoadFriends(friends))
                );
        })
    );
}

@Injectable()
export class BookmarkFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    GetCountBookmarskFriends$: Observable<Action> = this.actions$.pipe(
        ofType<GetCountBookmarksFriends>(friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            return this.friendsService
                .getCountBookmarskFriends()
                .pipe(
                    map(count => new SetCountBookmarksFriends(count))
                );
        })
    );

    @Effect()
    SetBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<SetBookmarkFriends>(friendsActionTypes.SET_BOOKMARK_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setBookmark(action.payload.id, action.payload.bookmark);
            const count = action.payload.bookmark ? ++store.bookmarks.count : --store.bookmarks.count;

            // обновляем список друзей, когда на вкладке закладок
            // todo from []
            return of(new SetCountBookmarksFriends(count));
        })
    );

    @Effect()
    ShowBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<ShowBookmarksFriends>(friendsActionTypes.SHOW_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            console.log('showBookmark',  action.payload);
            return of(new GetFriends({showBookmark: action.payload}));
        })
    );
}


@Injectable()
export class RatingFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    @Effect()
    SetRatingFriends$: Observable<Action> = this.actions$.pipe(
        ofType<SetBookmarkFriends>(friendsActionTypes.RATING_FRIENDS),
        switchMap((action) => {
            this.friendsService.setRating(action.payload.id, action.payload.rating);
            // todo сделать обновление документа
            return of();
        })
    );

}
