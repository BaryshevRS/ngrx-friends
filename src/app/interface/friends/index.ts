import {Friend} from '../../class/friends';

export interface IGetFriends {
    typeSort?: number;
    searchValue?: string;
    showBookmark?: boolean;
    startView?: number;
    limitView?: number;
}

export interface Friends {
    friends: Friend[];
    configsFriends?: IGetFriends;
    bookmarks?: {
        count: number;
    }
}
