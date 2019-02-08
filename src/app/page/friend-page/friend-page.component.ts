import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getDescriptions, getFriends} from '../../store/selector/friends.selector';
import {Friend} from '../../class/friends';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friend-page.component.html',
    styleUrls: ['./friend-page.component.scss']
})

export class FriendPageComponent implements OnInit {

    private friend$;
    public friend: Friend;

    constructor(
        private store$: Store<any>
    ) {}

    ngOnInit() {
        this.friend$ = this.store$.pipe(select(getDescriptions));

        this.friend$.subscribe((friend) => {
            console.log('friend', friend);
            this.friend = friend;
        })
    }

    ngOnDestroy() {
        /*if(this.friend$) {
            this.friend$.unsubscribe();
        }*/
    }
}
