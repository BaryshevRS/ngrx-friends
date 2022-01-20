import { Friend } from '../../class/friends';
import { ErrorMessage } from '../../class/errors';

export interface ConfigsFriends {
  typeSort?: number;
  searchValue?: string;
  showBookmark?: boolean;
  startView?: number;
  limitView?: number;
}

export interface FriendsState {
  friends: Friend[];
  friendDescription?: Friend;
  configsFriends?: ConfigsFriends;
  bookmarks?: {
    count: number;
  };
  loading?: boolean;
  errors?: ErrorMessage;
}
