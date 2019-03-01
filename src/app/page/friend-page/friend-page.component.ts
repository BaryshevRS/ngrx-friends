import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getDescriptions} from '../../store/selector/friends.selector';
import {Friend} from '../../class/friends';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friend-page.component.html'
})

export class FriendPageComponent implements OnInit, OnDestroy {

    private friend$;
    public friend: Friend;

    constructor(
        private store$: Store<any>
    ) {}

    ngOnInit() {
        this.friend$ = this.store$.pipe(select(getDescriptions))
            .subscribe((friend) => {
                this.friend = friend;
            });
    }

    ngOnDestroy() {
        if (this.friend$) {
            this.friend$.unsubscribe();
        }
    }
}
