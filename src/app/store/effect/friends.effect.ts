import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as FriendsAction from '../action';
import { ofType } from '@ngrx/effects';
import { FriendsService } from '../../service/friends.service';
import { ErrorMessage } from '../../class/errors';
import { AppState } from '../reducer';

@Injectable()
export class FriendsEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private friendsService: FriendsService
  ) {}

  getFriends$ = createEffect(() => this.actions$.pipe(
    ofType(
      FriendsAction.GetFriends,
      FriendsAction.SortFriends,
      FriendsAction.SearchFriends,
      FriendsAction.ShowBookmarksFriends
    ),
    withLatestFrom(this.store$.select('friends')),
    switchMap(([configsFriends, store]) => {
      const params = { ...store.configsFriends, ...configsFriends };
      return this.friendsService.getFriends(params).pipe(
        map((friends) => {
          let errors = null;

          friends = friends || [];

          if (friends && friends.length > 0) {
            if (params.startView > 0) {
              friends = [...store.friends, ...friends];
            }
            params.startView = params.startView + params.limitView;
          } else {
            if (params.startView > 0) {
              friends = [...store.friends];
            } else {
              if (params.searchValue) {
                errors = new ErrorMessage('info', 'errorMessage.searchEmpty');
              } else if (params.showBookmark) {
                errors = new ErrorMessage('info', 'errorMessage.bookmarkEmpty');
              } else {
                errors = new ErrorMessage('info', 'errorMessage.friendsEmpty');
              }
            }
          }

          return FriendsAction.LoadFriends({friends: {
              configsFriends: params,
              friends,
              errors
            }});
        }),
        catchError(() => of(
            FriendsAction.ErrorsFriends(
              {errors: new ErrorMessage('danger', 'errorMessage.friendsEmpty')}
            )
          ))
      );
    })
  ));

  getFriend$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsAction.GetFriend),
    switchMap(({id}) => {
      return this.friendsService.getFriend(id).pipe(
        map((friend) => {
          return FriendsAction.SetFriendDescription({friend});
        }),
        catchError(() => of(
          FriendsAction.ErrorsFriends(
            {
              errors: new ErrorMessage('danger', 'errorMessage.networkConnect')
            }
          )
        ))
      );
    })
  ));
}
