import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Friend} from '../../class/friends';
import {Store} from '@ngrx/store';
import {BookmarksFriends, RatingFriends} from '../../store/action';

//todo вынести состояние в контейнер

@Component({
    selector: 'app-friend',
    templateUrl: './friend-item.component.html',
    styleUrls: ['./friend-item.component.scss']
})
export class FriendItemComponent implements OnInit {

    @Input() friend: Friend;

    constructor(
        private store$: Store<any>
    ) {}

    ngOnInit() {
    }

    bookmarkChange(value: number) {
        this.friend.bookmark = value;
        this.store$.dispatch(new BookmarksFriends(this.friend));
    }

    ratingChange(value: number) {
        this.friend.rating = value;
        this.store$.dispatch(new RatingFriends(this.friend));
    }
}
