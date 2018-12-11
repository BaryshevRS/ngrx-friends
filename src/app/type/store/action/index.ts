import {
    LoadFriends,
    RatingFriends,
    SortFriends,
    SearchFriends,
    GetFriends, SetCountBookmarksFriends, GetCountBookmarksFriends, SetBookmarkFriends
} from '../../../store/action';

export enum friendsActionTypes {
    GET_FRIENDS = '[Friends] GET_FRIENDS',
    LOAD_FRIENDS = '[Friends] LOAD_FRIENDS',
    SEARCH_FRIENDS = '[Friends] SEARCH_FRIENDS',
    SET_BOOKMARK_FRIENDS = '[Friends] SET_BOOKMARK_FRIENDS',
    GET_COUNT_BOOKMARKS_FRIENDS = '[Friends] GET_COUNT_BOOKMARKS_FRIENDS',
    SET_COUNT_BOOKMARKS_FRIENDS = '[Friends] SET_COUNT_BOOKMARKS_FRIENDS',
    RATING_FRIENDS = '[Friends] RATING_FRIENDS',
    SORT_FRIENDS = '[Friends] SORT_FRIENDS',
    DELETE_FRIENDS = '[Friends] DELETE_FRIENDS',
    BOOKMARK_FRIENDS_PAGE =  '[Friends] BOOKMARK_FRIENDS_PAGE',
    BOOKMARK_FRIENDS_ALL =  '[Friends] BOOKMARK_FRIENDS_ALL'
}

export type FriendsAction = LoadFriends | RatingFriends | SortFriends | SearchFriends | GetFriends |
            SetCountBookmarksFriends | GetCountBookmarksFriends | SetBookmarkFriends;
