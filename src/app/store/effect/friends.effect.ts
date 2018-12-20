import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
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
        ofType<GetFriends>(
            friendsActionTypes.GET_FRIENDS,
            friendsActionTypes.SORT_FRIENDS,
            friendsActionTypes.SEARCH_FRIENDS
        ),
        // todo нужно взять данные из селекта configsFriends
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {

 /*           console.log('store.configsFriends!! BEFORE', store.configsFriends);
            console.log('action.payload!! BEFORE', action.payload);*/

            const params = {...store.configsFriends, ...action.payload};

            // todo проверка, что число элементов не изменилось

            console.log('params!!', params);

            return this.friendsService
                .getFriends(params)
                .pipe(
                    map(friends => {

                        if(friends && friends.length > 0) {
                            // TODO нет перерисовки при значение 4

                           /* console.log('AR friends', friends);
                            console.log('AS friends', ...store.friends);*/

                            if (params.startView > 0) {
                                friends = [...store.friends, ...friends];
                            }

                          //  console.log('BR friends', friends);
                            params.startView = params.startView + params.limitView;
                        } else {
                           // console.log('ASx friends', ...store.friends);
                            friends = [...store.friends];
                            console.log('BRx friends', friends);
                            params.startView = params.startView - params.limitView;
                        }

                        return new LoadFriends({configsFriends: params, friends: friends})

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

            console.log('store.friends XXX', store.friends)

            // обновляем список друзей, когда на вкладке закладок
            const actions: Action[] = [new SetCountBookmarksFriends(count)];

            if (store.configsFriends.showBookmark) {
                console.log('store.configsFriends.showBookmark Y', store.configsFriends.showBookmark);
                actions.push(new GetFriends());
            } else {
           /*     const friends: Friend[] = store.friends.map(friend => {
                    if(friend.id === action.payload.id) {
                        friend.bookmark = action.payload.bookmark || 0;
                        return friend;
                    }
                });

                console.log('bookmark friends', friends);

                actions.push(new LoadFriends({friends: friends}));*/
            }

            return from(actions);
        })
    );

    @Effect()
    ShowBookmarkFriends$: Observable<Action> = this.actions$.pipe(
        ofType<ShowBookmarksFriends>(friendsActionTypes.SHOW_BOOKMARKS_FRIENDS),
        switchMap((action) => {
            action.payload = action.payload || false;
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
        withLatestFrom(this.store$.select('friends')),
        switchMap(([action, store]) => {
            this.friendsService.setRating(action.payload.id, action.payload.rating);

            const actions: Action[] = [];

            if (store.configsFriends.typeSort) {
                actions.push(new GetFriends(store.configsFriends));
            }

            return from(actions);
        })
    );

}
