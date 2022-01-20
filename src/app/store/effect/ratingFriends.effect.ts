import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';
import * as FriendsAction from '../action';

@Injectable()
export class RatingFriendsEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private friendsService: FriendsService
  ) {}

  SetRatingFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.SetRatingFriends),
    withLatestFrom(this.store$.select('friends')),
    switchMap(([{friend: {id, rating}}, store]) => {
      this.friendsService.setRating(id, rating);

      const actions: Action[] = [];
      if (store.configsFriends.typeSort) {
        const friends = this.friendsService.setRatingSort(
          store.friends,
          store.configsFriends.typeSort
        );
        actions.push(
          FriendsAction.LoadFriends({
            ...store,
            configsFriends: store.configsFriends,
            friends,
            errors: null
          })
        );
      }

      return from(actions);
    })
  ));
}
