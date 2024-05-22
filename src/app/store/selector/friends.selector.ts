import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Friend } from '../../pages/friends/shared/classes/friends';
import { ErrorMessage } from '../../pages/friends/shared/classes/errors';
import { FriendsState } from '../../pages/friends/shared/interfaces';

export const friendsFeatureSelector =
  createFeatureSelector<FriendsState>('friends');

export const getFriendsState = createSelector(
  friendsFeatureSelector,
  (state: FriendsState) => state
);

export const getFriendDetails = createSelector(
  friendsFeatureSelector,
  (state: FriendsState) => state.friendDetails
);

export const getFriends = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): Friend[] => state.friends
);

export const getErrors = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): ErrorMessage => state.errors
);

export const getLoading = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): boolean => !state.errors && state.loading
);

export const getBookmarksCount = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): number => state.bookmarks.count
);

export const getTypeSort = createSelector(
  friendsFeatureSelector,
  (state: FriendsState): number => state.configsFriends.typeSort
);
