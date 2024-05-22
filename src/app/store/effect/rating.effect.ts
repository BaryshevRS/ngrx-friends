import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../pages/friends/shared/service/friends/friends.service';
import * as FriendsAction from '../action';
import * as FriendsActions from '../action';
import { friendsFeatureSelector } from '../selector/friends.selector';

@Injectable()
export class RatingEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private friendsService: FriendsService
  ) {}

  setRatingFriends$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.SetRatingFriends),
      withLatestFrom(this.store$.select(friendsFeatureSelector)),
      switchMap(
        ([
          {
            friend: { id, rating }
          },
          store
        ]) => {
          // Get all scrolled friends
          const limitView =
            store.configsFriends.startView || store.configsFriends.limitView;
          const startView = 0;
          this.friendsService.setRating(id, rating);
          return [
            FriendsActions.GetFriends({
              configsFriends: { limitView, startView }
            })
          ];
        }
      )
    )
  );

  setRatingFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.SetRatingFriend),
      switchMap(({ friend }) => {
        const { id, rating } = friend;
        this.friendsService.setRating(id, rating);
        return of(FriendsAction.SetDetailsFriend({ friend }));
      })
    )
  );
}
