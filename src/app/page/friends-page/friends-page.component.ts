import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Friend} from '../../class/friends';
import {GetFriends} from '../../store/action';
import {Observable} from 'rxjs';
import {getErrors, getFriends} from '../../store/selector/friends.selector';
import {ErrorMessage} from '../../class/errors';

@Component({
    selector: 'app-friends',
    templateUrl: './friends-page.component.html'
})

export class FriendsPageComponent implements OnInit {

    public friends: Friend[];
    public friends$: Observable<Friend[]>;
    public errors$;
    public errorMsg: boolean;

    constructor(
        private store$: Store<any>
    ) {}

    // fill up page, if height content not more, than height screen
    drawing() {
        console.log('drawing');
        this.store$.dispatch(new GetFriends());
    }

    ngOnInit() {
        this.friends$ = this.store$.pipe(select(getFriends));
        this.errors$ = this.store$.pipe(select(getErrors)).subscribe((ErrorMessage:ErrorMessage) => {
            this.errorMsg = ErrorMessage && ErrorMessage.text ? true : false;
        });
        this.store$.dispatch(new GetFriends());
    }

    ngOnDestroy(){
        this.errors$.unsubscribe();
    }

}
