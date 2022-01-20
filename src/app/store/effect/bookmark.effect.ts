import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';
import { ErrorMessage } from '../../class/errors';
import * as FriendsAction from '../action';
import { FriendsState } from '../../interface/friends';
import { AppState } from '../reducer';
import { friendsFeatureSelector } from '../selector/friends.selector';

@Injectable()
export class BookmarkFriendsEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private friendsService: FriendsService
  ) {}

  // Count bookmarks get to emulated from server
  getCountBookmarksFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.GetCountBookmarksFriends),
      switchMap(action =>
        this.friendsService.getCountBookmarksFriends().pipe(
          map(count => FriendsAction.SetCountBookmarksFriends({count})),
          catchError(() => of(FriendsAction.ErrorsFriends(
            { errors: new ErrorMessage('danger', 'errorMessage.networkConnect')
          })))
        )
      )
    )
  );

  setBookmarkFriends$ = createEffect(() => this.actions$.pipe( //
    ofType(FriendsAction.BookmarksFriends),
    withLatestFrom(this.store$.select(friendsFeatureSelector)),
    switchMap(([{friend}, store]) => {
      console.error('friend', friend)
      const {id, bookmark} = friend;
      this.friendsService.setBookmark( id, bookmark );

      // todo: get from bookmark server request
      let count = bookmark
        ? ++store.bookmarks.count
        : --store.bookmarks.count;
      count = count < 0 ? 0 : count;

      const actions: Action[] = [FriendsAction.SetCountBookmarksFriends({count})];

      // Friend list is updated when showing bookmark
      if (store.configsFriends.showBookmark) {
        let errors;
        // todo: Запрашивать из json заново
        const friends = this.friendsService.getFilterBookmark(store.friends);

        if (friends.length === 0) {
          errors = new ErrorMessage('info', 'errorMessage.bookmarkEmpty');
        }

        actions.push(
          FriendsAction.LoadFriends({friends: {
              ...store,
              friends,
              errors
            }})
        );
      }

      return from(actions);
    })
  ));
}
