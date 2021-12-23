import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {switchMap, filter} from 'rxjs/operators';
import {GetFriend} from '../action';
import {ofType} from '@ngrx/effects';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions
    ) {
    }

    @Effect()
    routeChange$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((payload: RouterNavigationAction) => {
            if (payload) {
                const {payload: {routerState: {root: {firstChild: {routeConfig: {path}}}}}} = payload;
                return path === 'friends/:id';
            }
            return false;
        }),
        switchMap((action: RouterNavigationAction) => {
            const {id} = action.payload.routerState.root.firstChild.params;
            return of(new GetFriend(id));
        })
    );
}


