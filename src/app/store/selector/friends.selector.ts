import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Friends} from '../../interface/friends';
import {Friend} from '../../class/friends';
import {ErrorMessage} from '../../class/errors';

const fromGetFriends = (state: Friends): Friend[] => state.friends;
const getFriendsState = createFeatureSelector('friends');

export const getFriends = createSelector(
    getFriendsState,
    fromGetFriends
);

const fromGetFriendsErrors = (state: Friends): ErrorMessage => state.errors;

export const getErrors = createSelector(
    getFriendsState,
    fromGetFriendsErrors
);
