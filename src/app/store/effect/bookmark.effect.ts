import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';
import { ErrorMessage } from '../../class/errors';
import * as FriendsAction from '../action';
import { AppState } from '../reducer';
import { friendsFeatureSelector } from '../selector/friends.selector';

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

  setBookmarkFriends$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.SetBookmarksFriends),
    withLatestFrom(this.store$.select(friendsFeatureSelector)),
    switchMap(([{friend: {id, bookmark}}, store]) => {
      this.friendsService.setBookmark( id, bookmark );

      const friends = store.friends.map((currentFriend) => currentFriend.id === id ? {...currentFriend, bookmark} : currentFriend)

      return [
        FriendsAction.GetCountBookmarksFriends(),
        FriendsAction.LoadFriends({friends: {...store, friends}})
      ];
    })
  ));

  ShowBookmarkFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.ShowBookmarksFriends),
    switchMap(({showBookmark}) => of(FriendsAction.GetFriends({configsFriends: {showBookmark}}))),
    catchError(() => of(FriendsAction.ErrorsFriends(
      { errors: new ErrorMessage('danger', 'errorMessage.networkConnect')
      })))
  ));
}
