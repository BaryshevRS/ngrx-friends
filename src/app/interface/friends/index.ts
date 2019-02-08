import {Friend} from '../../class/friends';
import {ErrorMessage} from '../../class/errors';

export interface IGetFriends {
    typeSort?: number;
    searchValue?: string;
    showBookmark?: boolean;
    startView?: number;
    limitView?: number;
}

export interface Friends {
    friends: Friend[];
    friendDescription?: Friend;
    configsFriends?: IGetFriends;
    bookmarks?: {
        count: number;
    };
    loading?: boolean;
    errors?: ErrorMessage;
}
