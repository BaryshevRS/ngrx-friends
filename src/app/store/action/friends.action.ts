import {Action} from '@ngrx/store';
import {friendsActionTypes} from '../type/index';
import {Friend} from '../../class/friends';
import {Friends, IGetFriends} from '../../interface/friends';

export class LoadFriends implements Action {
    readonly type = friendsActionTypes.LOAD_FRIENDS;

    constructor(public payload: Friends) {}
}

export class GetFriends implements Action {
    readonly type = friendsActionTypes.GET_FRIENDS;

    constructor(public payload?: IGetFriends) {}
}

export class GetFriend implements Action {
    readonly type = friendsActionTypes.GET_FRIEND;

    constructor(public payload: string) {}
}

export class SetFriendDescription implements Action {
    readonly type = friendsActionTypes.SET_FRIEND_DESCRIPTION;

    constructor(public payload: Friend) {}
}

export class RatingFriends implements Action {
    readonly type = friendsActionTypes.RATING_FRIENDS;

    constructor(public payload: Friend) {}
}

export class SearchFriends implements Action {
    readonly type = friendsActionTypes.SEARCH_FRIENDS;

    constructor(public payload: string) {}
}

export class SortFriends implements Action {
    readonly type = friendsActionTypes.SORT_FRIENDS;

    constructor(public payload: number) {}
}

export class BookmarksFriends implements Action {
    readonly type = friendsActionTypes.BOOKMARKS_FRIENDS;

    constructor(public payload: Friend) {}
}

export class GetCountBookmarksFriends implements Action {
    readonly type = friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS;
}

export class SetCountBookmarksFriends implements Action {
    readonly type = friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS;

    constructor(public payload: number) {}
}

export class ShowBookmarksFriends implements Action {
    readonly type = friendsActionTypes.SHOW_BOOKMARKS_FRIENDS;

    constructor(public payload: boolean) {}
}

export class ErrorsFriends implements Action {
    readonly type = friendsActionTypes.ERRORS_FRIENDS;

    constructor(public payload: Object | String) {}
}

