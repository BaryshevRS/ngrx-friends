import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Friend } from '../../class/friends';
import { ErrorMessage } from '../../class/errors';
import { FriendsState } from '../../interface/friends';

export const selectFriends = (state: FriendsState) => state;

export const getFriendsState = createSelector(
  selectFriends,
  (state: FriendsState) => state
);

export const getDescriptions = createSelector(
  selectFriends,
  (state: FriendsState) => state.friendDescription
);

export const getFriends = createSelector(
  selectFriends,
  (state: FriendsState): Friend[] => state.friends
);

export const getErrors = createSelector(
  selectFriends,
  (state: FriendsState): ErrorMessage => state.errors
);
