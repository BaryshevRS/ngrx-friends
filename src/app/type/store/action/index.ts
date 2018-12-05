import {LoadFriends, BookmarkFriends, RatingFriends, SortFriends, SearchFriends, GetFriends} from '../../../store/action';

export type FriendsAction = LoadFriends | BookmarkFriends | RatingFriends | SortFriends | SearchFriends | GetFriends;

export enum friendsActionTypes {
    GET_FRIENDS = '[Friends] GET_FRIENDS',
    LOAD_FRIENDS = '[Friends] LOAD_FRIENDS',
    SEARCH_FRIENDS = '[Friends] SEARCH_FRIENDS',
    BOOKMARK_FRIENDS = '[Friends] BOOKMARK_FRIENDS',
    RATING_FRIENDS = '[Friends] RATING_FRIENDS',
    SORT_FRIENDS = '[Friends] SORT_FRIENDS',
    DELETE_FRIENDS = '[Friends] DELETE_FRIENDS',
    BOOKMARK_FRIENDS_PAGE =  '[Friends] BOOKMARK_FRIENDS_PAGE',
    BOOKMARK_FRIENDS_ALL =  '[Friends] BOOKMARK_FRIENDS_ALL'
}
