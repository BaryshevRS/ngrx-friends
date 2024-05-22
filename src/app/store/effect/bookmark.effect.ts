import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../pages/friends/shared/service/friends/friends.service';
import { ErrorMessage } from '../../pages/friends/shared/classes/errors';
import * as FriendsAction from '../action';
import { AppState } from '../reducer';
import { friendsFeatureSelector } from '../selector/friends.selector';
import * as FriendsActions from '../action';

@Injectable()
export class BookmarkEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private friendsService: FriendsService
  ) {}

  // Count bookmarks get to emulated from server
  getCountBookmarksFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.GetCountBookmarksFriends),
      switchMap((action) =>
        this.friendsService.getCountBookmarksFriends().pipe(
          map((count) => FriendsAction.SetCountBookmarksFriends({ count })),
          catchError(() =>
            of(
              FriendsAction.ErrorsFriends({
                errors: new ErrorMessage(
                  'danger',
                  'errorMessage.networkConnect'
                )
              })
            )
          )
        )
      )
    )
  );

  setBookmarksFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.SetBookmarksFriends),
      withLatestFrom(this.store$.select(friendsFeatureSelector)),
      switchMap(
        ([
          {
            friend: { id, bookmark }
          },
          store
        ]) => {
          this.friendsService.setBookmark(id, bookmark);
          const limitView =
            store.configsFriends.startView || store.configsFriends.limitView;
          const startView = 0;
          return [
            FriendsAction.GetCountBookmarksFriends(),
            FriendsActions.GetFriends({
              configsFriends: { limitView, startView }
            })
          ];
        }
      )
    )
  );

  setBookmarksFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.SetBookmarksFriend),
      switchMap(({ friend }) => {
        const { id, bookmark } = friend;
        this.friendsService.setBookmark(id, bookmark);
        return of(FriendsAction.SetDetailsFriend({ friend }));
      })
    )
  );
}
