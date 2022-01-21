import { Friend } from '../classes/friends';
import { ErrorMessage } from '../classes/errors';

export interface ConfigsFriends {
  typeSort?: number;
  searchValue?: string;
  showBookmark?: boolean;
  startView?: number;
  limitView?: number;
}

export interface FriendsState {
  friends: Friend[];
  friendDetails?: Friend;
  configsFriends?: ConfigsFriends;
  bookmarks?: {
    count: number;
  };
  loading?: boolean;
  errors?: ErrorMessage;
}
