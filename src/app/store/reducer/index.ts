import { ActionReducerMap } from '@ngrx/store';
// import { routerReducer } from '@ngrx/router-store';
import {friendsReducer} from './friends.reducer';


export const appReducer: ActionReducerMap<any> = {
    friends: friendsReducer,
};
