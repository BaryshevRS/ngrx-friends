import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Friend } from '../../class/friends';
import { Store } from '@ngrx/store';
import * as FriendsActions from '../../store/action';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendItemComponent {
  @Input() friend: Friend;

  constructor(private store$: Store<FriendsState>) {}

  bookmarkChange(value: number) {
    this.friend.bookmark = value;
    this.store$.dispatch(FriendsActions.BookmarksFriends({friend: this.friend}));
  }

  ratingChange(value: number) {
    this.friend.rating = value;
    this.store$.dispatch(FriendsActions.RatingFriends({friend: this.friend}));
  }
}
