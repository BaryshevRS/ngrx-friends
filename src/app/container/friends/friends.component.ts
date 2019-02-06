import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Friend} from '../../class/friends';
import {GetFriends} from '../../store/action';
import {Observable, Subscribable} from 'rxjs';
import {getErrors, getFriends} from '../../store/selector/friends.selector';
import {ErrorMessage} from '../../class/errors';

// todo добавить лоадеры и вывод ошибок, если данные недоступны

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

    public friends: Friend[];
    public friends$: Observable<Friend[]>;
    public errors$;
    public errorMsg: boolean;

    constructor(
        private store$: Store<any>
    ) {}

    // дозаполнение страницы, если выведенного контента меньше, чем высота экрана и при скролле
    drawing() {
        console.log('drawing');
        this.store$.dispatch(new GetFriends());
    }

    ngOnInit() {
        this.friends$ = this.store$.pipe(select(getFriends));
        this.errors$ = this.store$.pipe(select(getErrors)) .subscribe((ErrorMessage:ErrorMessage) => {
            console.log('ErrorMessage', ErrorMessage);
             this.errorMsg = ErrorMessage && ErrorMessage.text ? true : false;
        });
        this.store$.dispatch(new GetFriends());
    }

    ngOnDestroy(){
        this.errors$.unsubscribe();
    }

}
