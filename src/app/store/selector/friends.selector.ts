import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Friend } from '../../class/friends';
import { ErrorMessage } from '../../class/errors';
import { FriendsState } from '../../interface/friends';

export const friendsFeatureSelector = createFeatureSelector<FriendsState>('friends');

export const getFriendsState = createSelector(
  friendsFeatureSelector,
  (state: FriendsState) => state
);

export const getDescriptions = createSelector(
  friendsFeatureSelector,
  (state: FriendsState) => state.friendDescription
);

export const getFriends = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): Friend[] => state.friends
);

export const getErrors = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): ErrorMessage => state.errors
);
