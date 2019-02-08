import {
    LoadFriends,
    RatingFriends,
    SortFriends,
    SearchFriends,
    GetFriends,
    SetCountBookmarksFriends,
    GetCountBookmarksFriends,
    BookmarksFriends,
    ShowBookmarksFriends,
    ErrorsFriends,
    SetFriendDescription
} from '../action/index';

export enum friendsActionTypes {
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

export type FriendsAction = LoadFriends | RatingFriends | SortFriends | SearchFriends | GetFriends |
            SetCountBookmarksFriends | GetCountBookmarksFriends | BookmarksFriends | ShowBookmarksFriends |
            ErrorsFriends | SetFriendDescription;
