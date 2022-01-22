import { FriendsState } from '../../pages/friends/shared/interfaces';
import { createReducer, on } from "@ngrx/store";
import * as FriendsActions from '../action';

const initialState: FriendsState = {
  friends: [],
  friendDetails: null,
  configsFriends: {
    typeSort: 0,
    searchValue: '',
    showBookmarks: false,
    startView: 0,
    limitView: 20
  },
  bookmarks: {
    count: 0
  },
  loading: false,
  errors: null
};

export const friendsReducer = createReducer(
  initialState,
  on(FriendsActions.LoadFriends, (state, {friends}) => ({
    ...state,
    ...friends,
    loading: false,
  })),
  on(FriendsActions.GetFriends, (state, {configsFriends}) => ({
    ...state,
    configsFriends: {
      ...state.configsFriends, ...configsFriends
    },
    loading: true,
  })),
  on(FriendsActions.GetFriend, (state) => ({
    ...state,
    loading: true,
    friendDetails: null
  })),
  on(FriendsActions.SetDetailsFriend, (state, {friend: friendDetails}) => ({
    ...state,
    loading: false,
    friendDetails
  })),
  on(FriendsActions.SortFriends, (state, {configsFriends}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...configsFriends,
      startView: 0
    }
  })),
  on(FriendsActions.SearchFriends, (state, {configsFriends}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...configsFriends,
      startView: 0
    },
  })),
  on(FriendsActions.ShowBookmarksFriends, (state, {configsFriends}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...configsFriends,
      startView: 0
    },
  })),
  on(FriendsActions.SetCountBookmarksFriends, (state, {count}) => ({
    ...state,
    ...{ bookmarks: { count } }
  })),
  on(FriendsActions.ErrorsFriends, (state, {errors}) => ({
    ...state,
    errors
  })),
);
