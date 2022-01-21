import { FriendsState } from '../../pages/friends/shared/interfaces';
import { createReducer, on } from "@ngrx/store";
import * as FriendsActions from '../action';

const initialState: FriendsState = {
  friends: [],
  friendDescription: null,
  configsFriends: {
    typeSort: 0,
    searchValue: '',
    showBookmark: false,
    startView: 0,
    limitView: 20
  },
  bookmarks: {
    count: 0
  },
  loading: false,
  errors: null
};

const UpdateFriend = (state, {friend}) => ({
  ...state,
  friends: state.friends.map((friendCurrent) => {
    return friendCurrent.id === friend.id ? friend : friendCurrent;
  })
});

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
    friendDescription: null
  })),
  on(FriendsActions.SetFriendDescription, (state, {friend: friendDescription}) => ({
    ...state,
    loading: false,
    friendDescription
  })),
  on(FriendsActions.SortFriends, (state, {typeSort}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...{ typeSort, startView: 0 }
    }
  })),
  on(FriendsActions.SearchFriends, (state, {searchValue}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...{ searchValue, startView: 0 }
    },
  })),
  on(FriendsActions.ShowBookmarksFriends, (state, {showBookmark}) => ({
    ...state,
    loading: true,
    configsFriends: {
      ...state.configsFriends,
      ...{ showBookmark, startView: 0 }
    },
  })),
  on(FriendsActions.SetBookmarksFriends, UpdateFriend),
  on(FriendsActions.SetRatingFriends, UpdateFriend),
  on(FriendsActions.SetCountBookmarksFriends, (state, {count}) => ({
    ...state,
    ...{ bookmarks: { count } }
  })),
  on(FriendsActions.ErrorsFriends, (state, {errors}) => ({
    ...state,
    errors
  })),
);
