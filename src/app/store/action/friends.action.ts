import { createAction, props } from '@ngrx/store';
import { Friend } from '../../class/friends';
import { FriendsState, ConfigsFriends } from '../../interface/friends';
import { ErrorMessage } from '../../class/errors';

enum friendsActionTypes {
  GET_FRIENDS = '[Friends] GET_FRIENDS',
  LOAD_FRIENDS = '[Friends] LOAD_FRIENDS',
  SEARCH_FRIENDS = '[Friends] SEARCH_FRIENDS',
  RATING_FRIENDS = '[Friends] RATING_FRIENDS',
  SORT_FRIENDS = '[Friends] SORT_FRIENDS',
  GET_FRIEND = '[Friends] GET_FRIEND',
  SET_FRIEND_DESCRIPTION = '[Friends] SET_FRIEND_DESCRIPTION',
  BOOKMARKS_FRIENDS = '[Friends] BOOKMARKS_FRIENDS',
  GET_COUNT_BOOKMARKS_FRIENDS = '[Friends] GET_COUNT_BOOKMARKS_FRIENDS',
  SET_COUNT_BOOKMARKS_FRIENDS = '[Friends] SET_COUNT_BOOKMARKS_FRIENDS',
  SHOW_BOOKMARKS_FRIENDS = '[Friends] SHOW_BOOKMARKS_FRIENDS',
  ERRORS_FRIENDS = '[Friends] ERRORS_FRIENDS'
}

export const LoadFriends = createAction(friendsActionTypes.LOAD_FRIENDS, props<{friends: FriendsState}>());
export const GetFriends = createAction(friendsActionTypes.GET_FRIENDS, props<{configsFriends?: ConfigsFriends}>());
export const GetFriend = createAction(friendsActionTypes.GET_FRIEND, props<{id: string}>());
export const SetFriendDescription = createAction(friendsActionTypes.SET_FRIEND_DESCRIPTION, props<{friend: Friend}>());
export const RatingFriends = createAction(friendsActionTypes.RATING_FRIENDS, props<{friend: Friend}>());
export const SearchFriends = createAction(friendsActionTypes.SEARCH_FRIENDS, props<{searchValue: string}>());
export const SortFriends = createAction(friendsActionTypes.SORT_FRIENDS, props<{typeSort: number}>());
export const BookmarksFriends = createAction(friendsActionTypes.BOOKMARKS_FRIENDS, props<{friend: Friend}>());
export const GetCountBookmarksFriends = createAction(friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS);
export const SetCountBookmarksFriends = createAction(friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS, props<{count: number}>());
export const ShowBookmarksFriends = createAction(friendsActionTypes.SHOW_BOOKMARKS_FRIENDS, props<{showBookmark: boolean}>());
export const ErrorsFriends = createAction(friendsActionTypes.ERRORS_FRIENDS, props<{errors: ErrorMessage}>());
