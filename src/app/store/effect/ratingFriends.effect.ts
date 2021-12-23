import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { friendsActionTypes } from '../type';
import {
  LoadFriends,
  RatingFriends
} from '../action';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';

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
        actions.push(new LoadFriends({configsFriends: store.configsFriends, friends: friends, errors: null}));
      }

      return from(actions);
    })
  );
}
