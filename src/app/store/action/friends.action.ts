import { createAction, props } from '@ngrx/store';
import { Friend } from '../../pages/friends/shared/classes/friends';
import {
  ConfigsFriends,
  FriendsState
} from '../../pages/friends/shared/interfaces';
import { ErrorMessage } from '../../pages/friends/shared/classes/errors';

enum friendsActionTypes {
  GET_FRIENDS = '[Friends] GET_FRIENDS',
  LOAD_FRIENDS = '[Friends] LOAD_FRIENDS',
  SEARCH_FRIENDS = '[Friends] SEARCH_FRIENDS',
  SET_RATING_FRIENDS = '[Friends] SET_RATING_FRIENDS',
  SORT_FRIENDS = '[Friends] SORT_FRIENDS',
  GET_FRIEND = '[Friends] GET_FRIEND',
  SET_DETAILS_FRIEND = '[Friends] SET_DETAILS_FRIEND',
  SET_BOOKMARKS_FRIENDS = '[Friends] SET_BOOKMARKS_FRIENDS',
  GET_COUNT_BOOKMARKS_FRIENDS = '[Friends] GET_COUNT_BOOKMARKS_FRIENDS',
  SET_COUNT_BOOKMARKS_FRIENDS = '[Friends] SET_COUNT_BOOKMARKS_FRIENDS',
  SHOW_BOOKMARKS_FRIENDS = '[Friends] SHOW_BOOKMARKS_FRIENDS',
  ERRORS_FRIENDS = '[Friends] ERRORS_FRIENDS',
  SET_BOOKMARKS_FRIEND = '[Friends] SET_BOOKMARKS_FRIEND',
  SET_RATING_FRIEND = '[Friends] SET_RATING_FRIEND'
}

export const LoadFriends = createAction(
  friendsActionTypes.LOAD_FRIENDS,
  props<{ friends: FriendsState }>()
);
export const GetFriends = createAction(
  friendsActionTypes.GET_FRIENDS,
  props<{ configsFriends: ConfigsFriends }>()
);
export const GetFriend = createAction(
  friendsActionTypes.GET_FRIEND,
  props<{ id: string }>()
);
export const SetDetailsFriend = createAction(
  friendsActionTypes.SET_DETAILS_FRIEND,
  props<{ friend: Friend }>()
);
export const SetRatingFriends = createAction(
  friendsActionTypes.SET_RATING_FRIENDS,
  props<{ friend: Friend }>()
);
export const SearchFriends = createAction(
  friendsActionTypes.SEARCH_FRIENDS,
  props<{ configsFriends: ConfigsFriends }>()
);
export const SortFriends = createAction(
  friendsActionTypes.SORT_FRIENDS,
  props<{ configsFriends: ConfigsFriends }>()
);
export const SetBookmarksFriends = createAction(
  friendsActionTypes.SET_BOOKMARKS_FRIENDS,
  props<{ friend: Friend }>()
);
export const GetCountBookmarksFriends = createAction(
  friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS
);
export const SetCountBookmarksFriends = createAction(
  friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS,
  props<{ count: number }>()
);
export const ShowBookmarksFriends = createAction(
  friendsActionTypes.SHOW_BOOKMARKS_FRIENDS,
  props<{ configsFriends: ConfigsFriends }>()
);
export const ErrorsFriends = createAction(
  friendsActionTypes.ERRORS_FRIENDS,
  props<{ errors: ErrorMessage }>()
);
export const SetBookmarksFriend = createAction(
  friendsActionTypes.SET_BOOKMARKS_FRIEND,
  props<{ friend: Friend }>()
);
export const SetRatingFriend = createAction(
  friendsActionTypes.SET_RATING_FRIEND,
  props<{ friend: Friend }>()
);
