import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Friend } from '../../class/friends';
import { Store } from '@ngrx/store';
import * as FriendsActions from '../../store/action';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html'
})
export class FriendItemComponent {
  @Input() friend: Friend;

  constructor(private store$: Store<FriendsState>) {}

  bookmarkChange(bookmark: boolean) {
    this.store$.dispatch(FriendsActions.SetBookmarksFriends({friend: {...this.friend, bookmark}}));
  }

  ratingChange(rating: number) {
    this.store$.dispatch(FriendsActions.SetRatingFriends({friend: {...this.friend, rating}}));
  }
}
