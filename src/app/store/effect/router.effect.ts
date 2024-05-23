import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { routerNavigatedAction } from '@ngrx/router-store';
import * as FriendsActions from '../action';
import { selectRouteParams } from '../selector/router.selector';

import { select, Store } from '@ngrx/store';
import { AppState } from '../reducer';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>) {}

  routeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store$.pipe(select(selectRouteParams))),
      filter(([, params]) => !!params?.['id']),
      switchMap(([, { id }]) => {
        return of(FriendsActions.GetFriend({ id }));
      })
    )
  );
}
