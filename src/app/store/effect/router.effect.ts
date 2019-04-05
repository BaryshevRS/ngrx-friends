import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {switchMap, filter} from 'rxjs/operators';
import {GetFriend} from '../action';
import {ofType} from '@ngrx/effects';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Router} from '@angular/router';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }

    @Effect()
    routeChange$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((
            {payload: {routerState: {root: {firstChild: {routeConfig: {path}}}}}}: RouterNavigationAction) => path === 'friends/:id'
        ),
        switchMap((action: RouterNavigationAction) => {
            const id = action.payload.routerState.root.firstChild.params.id;
            return of(new GetFriend(id));
        })
    );
}


