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
    BookmarksFriends
} from '../action';
import {ofType} from '@ngrx/effects';
import {FriendsService} from '../../service/friends.service';
import {ErrorMessage} from '../../class/errors';

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
            let count = action.payload.bookmark ? ++store.bookmarks.count : --store.bookmarks.count;
            count = count < 0 ? 0 : count;

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
