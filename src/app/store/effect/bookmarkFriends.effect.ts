import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';
import { ErrorMessage } from '../../class/errors';
import * as FriendsAction from '../action';

@Injectable()
export class BookmarkFriendsEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private friendsService: FriendsService
  ) {}

  // Count bookmarks get to emulated from server
  GetCountBookmarksFriends$ = createEffect(() =>
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

  SetBookmarkFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.BookmarksFriends),
    withLatestFrom(this.store$.select('friends')),
    switchMap(([{friend: {id, bookmark}}, store]) => {
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
          FriendsAction.LoadFriends({
            ...store,
            friends,
            errors
          })
        );
      }

      return from(actions);
    })
  ));

/*  // todo: delete
  ShowBookmarkFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.ShowBookmarksFriends),
    switchMap(({showBookmark}) => of(FriendsAction.GetFriends({configsFriends: {showBookmark}}))),
    catchError(() => of(FriendsAction.ErrorsFriends(
      { errors: new ErrorMessage('danger', 'errorMessage.networkConnect')
      })))
  ));*/
}
