import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Friend} from '../../class/friends';
import {Store} from '@ngrx/store';
import {BookmarksFriends, RatingFriends} from '../../store/action';

@Component({
    selector: 'app-friend-item',
    templateUrl: './friend-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendItemComponent {

    @Input() friend: Friend;

    constructor(
        private store$: Store<any>
    ) {}

    bookmarkChange(value: number) {
        this.friend.bookmark = value;
        this.store$.dispatch(new BookmarksFriends(this.friend));
    }

    ratingChange(value: number) {
        this.friend.rating = value;
        this.store$.dispatch(new RatingFriends(this.friend));
    }
}
