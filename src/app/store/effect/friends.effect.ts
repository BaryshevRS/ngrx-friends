import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom, filter} from 'rxjs/operators';
import {friendsActionTypes} from '../type/index';
import {
    LoadFriends,
    GetFriends,
    SetCountBookmarksFriends,
    GetCountBookmarksFriends,
    ShowBookmarksFriends,
    ErrorsFriends,
    BookmarksFriends,
    RatingFriends,
    GetFriend, SetFriendDescription,
} from '../action';
import {ofType} from '@ngrx/effects';
import {FriendsService} from '../../service/friends.service';
import {ErrorMessage} from '../../class/errors';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Router} from '@angular/router';

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
        ofType<LoadFriends>(
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

@Injectable()
export class BookmarkFriendsEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {
    }

    @Effect()
    GetCountBookmarskFriends$: Observable<Action> = this.actions$.pipe(
        ofType<GetCountBookmarksFriends>(friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            return this.friendsService
                .getCountBookmarskFriends()
                .pipe(
                    map(count => new SetCountBookmarksFriends(count)),
                    catchError(error => {
                        return of(new ErrorsFriends(new ErrorMessage('danger', 'errorMessage.networkConnect')));
                    })
                );
        })
    );

    @Effect()
    SetBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<BookmarksFriends>(friendsActionTypes.BOOKMARKS_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setBookmark(action.payload.id, action.payload.bookmark);
            const count = action.payload.bookmark ? ++store.bookmarks.count : --store.bookmarks.count;

            const actions: Action[] = [new SetCountBookmarksFriends(count)];

            // update friend list when show bookmark
            if (store.configsFriends.showBookmark) {
                let errors = null;
                const friends = this.friendsService.getFilterBookmark(store.friends);

                if (friends.length === 0) {
                    errors = new ErrorMessage('info', 'errorMessage.bookmarkEmpty');
                }

                actions.push(
                    new LoadFriends({configsFriends: store.configsFriends, friends: friends, errors: errors})
                );
            }

            return from(actions);
        })
    );

    @Effect()
    ShowBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<ShowBookmarksFriends>(friendsActionTypes.SHOW_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            action.payload = action.payload || false;
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
    ) {
    }

    @Effect()
    SetRatingFriends$: Observable<Action> = this.actions$.pipe(
        ofType<RatingFriends>(friendsActionTypes.RATING_FRIENDS),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setRating(action.payload.id, action.payload.rating);

            const actions: Action[] = [];
            if (store.configsFriends.typeSort) {

                const friends = this.friendsService.setRatingSort(store.friends, store.configsFriends.typeSort);
                actions.push(new LoadFriends({configsFriends: store.configsFriends, friends: friends}));
            }

            return from(actions);
        })
    );
}

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }

    @Effect()
    routeChange$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((
            {payload: {routerState: {root: {firstChild: {routeConfig: {path}}}}}}: RouterNavigationAction) => path === 'friends/:id'
        ),
        switchMap((action: RouterNavigationAction) => {
            const id = action.payload.routerState.root.firstChild.params.id;
            return of(new GetFriend(id));
        })
    );
}


