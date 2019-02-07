import {Component, Input, OnInit} from '@angular/core';
import {Friend} from '../../../class/friends';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {getErrors, getFriends} from '../../../store/selector/friends.selector';
import {ErrorMessage} from '../../../class/errors';
import {GetFriend, GetFriends} from '../../../store/action';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friend-page.component.html',
    styleUrls: ['./friend-page.component.scss']
})

export class FriendPageComponent implements OnInit {

    public id: string;
    private friends$;

    constructor(
        private store$: Store<any>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.friends$ = this.store$.pipe(select(getFriends));

        this.store$.dispatch(new GetFriend(this.id));
    }
}
