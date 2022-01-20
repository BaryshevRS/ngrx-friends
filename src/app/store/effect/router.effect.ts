import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import * as FriendsActions from '../../store/action';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions) {}

  routeChange$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((payload: RouterNavigationAction) => {
      if (payload) {
        const {
          payload: {
            routerState: {
              root: {
                firstChild: {
                  routeConfig: { path }
                }
              }
            }
          }
        } = payload;
        return path === 'friends/:id';
      }
      return false;
    }),
    switchMap((action: RouterNavigationAction) => {
      const { id } = action.payload.routerState.root.firstChild.params;
      return of(FriendsActions.GetFriend({id}));
    })
  ));
}
