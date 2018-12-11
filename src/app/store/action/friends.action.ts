import {Action} from '@ngrx/store';
import {friendsActionTypes} from '../../type/store/action';
import {Friend} from '../../class/friends';
import {IGetFriends} from '../../interface/friends';

export class SetBookmarkFriends implements Action {
    readonly type = friendsActionTypes.SET_BOOKMARK_FRIENDS;

    constructor(public payload: Friend) {}
}

export class GetCountBookmarksFriends implements Action {
    readonly type = friendsActionTypes.GET_COUNT_BOOKMARKS_FRIENDS;
}

export class SetCountBookmarksFriends implements Action {
    readonly type = friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS;

    constructor(public payload: number) {}
}

export class DeleteFriends implements Action {
    readonly type = friendsActionTypes.DELETE_FRIENDS;

    constructor(public payload: Friend) {}
}

export class LoadFriends implements Action {
    readonly type = friendsActionTypes.LOAD_FRIENDS;

    constructor(public payload: Friend[]) {}
}

export class GetFriends implements Action {
    readonly type = friendsActionTypes.GET_FRIENDS;

    constructor(public payload: IGetFriends) {}
}

export class RatingFriends implements Action {
    readonly type = friendsActionTypes.RATING_FRIENDS;

    constructor(public payload: Friend) {}
}

export class SearchFriends implements Action {
    readonly type = friendsActionTypes.SEARCH_FRIENDS;

    constructor(public payload: number) {}
}

export class SortFriends implements Action {
    readonly type = friendsActionTypes.SORT_FRIENDS;

    constructor(public payload: number) {}
}

// todo добавить экшен для ошибок
