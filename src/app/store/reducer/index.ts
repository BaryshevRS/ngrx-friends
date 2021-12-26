import { ActionReducerMap } from '@ngrx/store';
import { friendsReducer } from './friends.reducer';
import { routerReducer } from '@ngrx/router-store';

export const appReducer: ActionReducerMap<any> = {
  friends: friendsReducer,
  router: routerReducer
};
