import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Friend} from '../../../class/friends/index';
import {Store} from '@ngrx/store';
import {BookmarkFriends, RatingFriends} from '../../../store/action';
import {FriendsService} from '../../../service/friends.service';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

    @Input() friend: Friend;

    constructor(
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    ngOnInit() {
    }

    bookmarkChange(value: number) {
        this.friendsService.setBookmark(this.friend.id, value);
        this.friend.bookmark = value;
        this.store$.dispatch(new BookmarkFriends(this.friend));
    }

    ratingChange(value: number) {
        this.friendsService.setRating(this.friend.id, value);
        this.friend.rating = value;
        this.store$.dispatch(new RatingFriends(this.friend));
    }
}
