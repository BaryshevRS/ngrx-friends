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
    ErrorsFriends,
    BookmarksFriends,
    RatingFriends,
    GetFriend,
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
                                if(params.showBookmark) {
                                    errors = new ErrorMessage('info', 'errorMessage.bookmarkEmpty');
                                } else {
                                    errors = new ErrorMessage('info', 'errorMessage.friendEmpty');
                                }
                            }
                        }

                        return new LoadFriends(
                            {configsFriends: params, friends: friends, errors: errors}
                            );
                    }),
                    catchError(error => {
                        return of(new ErrorsFriends(new ErrorMessage('danger', 'errorMessage.networkConnect')));
                    })
                );
        })
    );

    @Effect({dispatch:false})
    getFriend$  = this.actions$.pipe(
        ofType<GetFriend>(
            friendsActionTypes.GET_FRIEND
        ),
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

            return this.friendsService
                .getFriend(action.payload)
                .pipe(
                    map(friends => {

                        console.log('friendsx', friends);
                        return friends;
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

            // обновляем список друзей, когда на вкладке закладок
            if (store.configsFriends.showBookmark) {
                let errors = null;
                const friends = this.friendsService.getFilterBookmark(store.friends);

                if(friends.length === 0) {
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
    ) {}

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
