import { FriendsEffect } from './friends.effect';
import { BookmarkFriendsEffect } from './bookmarkFriends.effect';
import { RouterEffects } from './router.effect';
import { RatingFriendsEffect } from './ratingFriends.effect';

export const appEffects = [
  FriendsEffect,
  BookmarkFriendsEffect,
  RatingFriendsEffect,
  RouterEffects
];
