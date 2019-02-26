import {Input, Component, OnInit} from '@angular/core';
import {Friend} from '../../class/friends';
import {BookmarksFriends, RatingFriends} from '../../store/action';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-friend-description',
    templateUrl: './friend-description.html',
    styleUrls: ['./friend-description.scss']
})
export class FriendDescription implements OnInit {
    @Input() friend: Friend;

    constructor(private store$: Store<any>) {
    }

    bookmarkChange(value: number) {
        this.friend.bookmark = value;
        this.store$.dispatch(new BookmarksFriends(this.friend));
    }

    ratingChange(value: number) {
        this.friend.rating = value;
        this.store$.dispatch(new RatingFriends(this.friend));
    }

    ngOnInit() {
        console.log('friend', this.friend)
    }
}
