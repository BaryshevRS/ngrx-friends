import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Friend } from '../../../../shared/classes/friends';
import { Store } from '@ngrx/store';
import * as FriendsActions from '../../../../../../store/action';
import { FriendsState } from '../../../../shared/interfaces';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendDetailsComponent {
  @Input() friend: Friend;

  constructor(private store$: Store<FriendsState>) {}

  bookmarkChange(bookmark: number) {
    this.store$.dispatch(
      FriendsActions.SetBookmarksFriend({
        friend: { ...this.friend, bookmark }
      })
    );
  }

  ratingChange(rating: number) {
    this.store$.dispatch(
      FriendsActions.SetRatingFriend({ friend: { ...this.friend, rating } })
    );
  }
}
