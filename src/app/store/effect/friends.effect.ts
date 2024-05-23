import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import * as FriendsAction from '../action';
import { FriendsService } from '../../pages/friends/shared/service/friends/friends.service';
import { ErrorMessage } from '../../pages/friends/shared/classes/errors';
import { AppState } from '../reducer';
import { friendsFeatureSelector } from '../selector/friends.selector';

@Injectable()
export class FriendsEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private friendsService: FriendsService
  ) {}

  getFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FriendsAction.GetFriends,
        FriendsAction.SortFriends,
        FriendsAction.SearchFriends,
        FriendsAction.ShowBookmarksFriends
      ),
      withLatestFrom(this.store$.select(friendsFeatureSelector)),
      exhaustMap(([{ configsFriends }, store]) => {
        const defaultLimitView = 20;
        const limitView = configsFriends.limitView
          ? configsFriends.limitView
          : defaultLimitView;
        const configs = {
          ...store.configsFriends,
          ...configsFriends,
          limitView
        };
        return this.friendsService.getFriends(configs).pipe(
          map((friends = []) => {
            let errors = null;

            if (friends && friends.length > 0) {
              if (configs.startView > 0) {
                friends = [...store.friends, ...friends];
              }
              configs.startView = configs.startView + configs.limitView;
            } else {
              if (configs.startView > 0) {
                friends = [...store.friends];
              } else {
                if (configs.searchValue) {
                  errors = new ErrorMessage('info', 'errorMessage.searchEmpty');
                } else if (configs.showBookmarks) {
                  errors = new ErrorMessage(
                    'info',
                    'errorMessage.bookmarkEmpty'
                  );
                } else {
                  errors = new ErrorMessage(
                    'info',
                    'errorMessage.friendsEmpty'
                  );
                }
              }
            }

            return FriendsAction.LoadFriends({
              friends: {
                configsFriends: configs,
                friends,
                errors
              }
            });
          }),
          catchError(() =>
            of(
              FriendsAction.ErrorsFriends({
                errors: new ErrorMessage('danger', 'errorMessage.friendsEmpty')
              })
            )
          )
        );
      })
    )
  );

  getFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsAction.GetFriend),
      switchMap(({ id }) => {
        return this.friendsService.getFriend(id).pipe(
          map((friend) => {
            return FriendsAction.SetDetailsFriend({ friend });
          }),
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
        );
      })
    )
  );
}
