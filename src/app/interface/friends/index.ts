import {Friend} from '../../class/friends';


export interface Friends {
    friends: Friend[];
}

export interface Configs {
    typeSort?: number;
}

export interface IGetFriends {
    typeSort?: number;
    searchValue?: string;
    showBookmark?: boolean;
    startView?: number;
    limitView?: number;
}
