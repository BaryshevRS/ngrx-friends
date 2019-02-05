import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {friendsActionTypes} from '../type/index';
import {
    LoadFriends,
    GetFriends,
    SetCountBookmarksFriends,
    GetCountBookmarksFriends,
    ShowBookmarksFriends,
    ErrorsFriends, BookmarksFriends, RatingFriends,
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
        ofType<GetFriends>(
            friendsActionTypes.GET_FRIENDS,
            friendsActionTypes.SORT_FRIENDS,
            friendsActionTypes.SEARCH_FRIENDS
        ),
        // todo нужно взять данные из селекта
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            const params =  {...store.configsFriends, ...action.payload};

            return this.friendsService
                .getFriends(params)
                .pipe(
                    map(friends => {

                        if (friends && friends.length > 0) {

                            if (params.startView > 0) {
                                friends = [...store.friends, ...friends];
                            }

                            params.startView = params.startView + params.limitView;
                        } else {
                            friends = [...store.friends];
                        }

                        return new LoadFriends({configsFriends: params, friends: friends});

                    })
                );
        }),
        catchError(error => of(new ErrorsFriends(error)))
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
        }),
        catchError(error => of(new ErrorsFriends(error)))
    );

    @Effect()
    SetBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<BookmarksFriends>(friendsActionTypes.BOOKMARKS_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setBookmark(action.payload.id, action.payload.bookmark);
            const count = action.payload.bookmark ? ++store.bookmarks.count : --store.bookmarks.count;

            const actions: Action[] = [new SetCountBookmarksFriends(count)];

            // обновляем список друзей, когда на вкладке закладок
            if (store.configsFriends.showBookmark) {
                const friends = this.friendsService.getFilterBookmark(store.friends);
                actions.push(new LoadFriends({configsFriends: store.configsFriends, friends: friends}));
            }

            return from(actions);
        }),
        catchError(error => of(new ErrorsFriends(error)))
    );

    @Effect()
    ShowBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<ShowBookmarksFriends>(friendsActionTypes.SHOW_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            action.payload = action.payload || false;
            return of(new GetFriends({showBookmark: action.payload}));
        }),
        catchError(error => of(new ErrorsFriends(error)))
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
        ofType<RatingFriends>(friendsActionTypes.RATING_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setRating(action.payload.id, action.payload.rating);

            const actions: Action[] = [];
            if (store.configsFriends.typeSort) {

                const friends = this.friendsService.setRatingSort(store.friends, store.configsFriends.typeSort)
                actions.push(new LoadFriends({configsFriends: store.configsFriends, friends: friends}));
            }

            return from(actions);
        }),
        catchError(error => of(new ErrorsFriends(error)))
    );
}
