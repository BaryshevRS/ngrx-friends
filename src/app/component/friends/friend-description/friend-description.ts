import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Friend} from '../../../class/friends/index';
import {Store} from '@ngrx/store';
import {RatingFriends, SetBookmarkFriends} from '../../../store/action';
import {ActivatedRoute} from '@angular/router';

//todo вынести состояние в контейнер

@Component({
    selector: 'app-friend-description',
    templateUrl: './friend-description.html',
    styleUrls: ['./friend-description.scss']
})
export class FriendDescription implements OnInit {

    @Input() friend: Friend =  new Friend();

    private id: string;

    constructor(
        private store$: Store<any>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

/*    bookmarkChange(value: number) {
        this.friend.bookmark = value;
        this.store$.dispatch(new SetBookmarkFriends(this.friend));
    }

    ratingChange(value: number) {
        // this.friendsService.setRating(this.friend.id, value);
        this.friend.rating = value;
        this.store$.dispatch(new RatingFriends(this.friend));
    }*/
}
