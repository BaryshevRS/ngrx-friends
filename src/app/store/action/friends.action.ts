import {Action} from '@ngrx/store';
import {friendsActionTypes} from '../../type/store/action';
import {Friend} from '../../class/friends';
import {IGetFriends} from '../../interface/friends';

export class BookmarkFriends implements Action {
    readonly type = friendsActionTypes.BOOKMARK_FRIENDS;

    constructor(public payload: Friend) {}
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

