import { ActionReducerMap } from '@ngrx/store';
import { friendsReducer } from './friends.reducer';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { FriendsState } from '../../interface/friends';

export interface AppState {
  friends: FriendsState;
  router: RouterState
}

export const appReducer: ActionReducerMap<AppState> = {
  friends: friendsReducer,
  router: routerReducer
};
