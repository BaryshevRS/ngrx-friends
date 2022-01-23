import { ActionReducerMap } from '@ngrx/store';
import { friendsReducer } from './friends.reducer';
import { FriendsState } from '../../pages/friends/shared/interfaces';
import { routerReducer, RouterState } from '@ngrx/router-store';

export interface AppState {
  friends: FriendsState;
  router: RouterState
}

export const appReducer: ActionReducerMap<AppState> = {
  friends: friendsReducer,
  router: routerReducer
};
