import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Friend} from '../../class/friends';
import {GetFriends} from '../../store/action';
import {Observable} from 'rxjs';
import {getFriends} from '../../store/selector/friends.selector';

// todo добавить лоадеры и вывод ошибок, если данные недоступны
// todo push change detection
// todo скролл на вверх
// todo переход по логотипу

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

    public friends: Friend[];
    public friends$: Observable<Friend[]>;

    constructor(
        private store$: Store<any>
    ) {}

    // дозаполнение страницы, если выведенного контента меньше, чем высота экрана и при скролле
    drawing() {
        console.log('drawing');
        this.store$.dispatch(new GetFriends());
    }

    ngOnInit() {
        this.friends$ = this.store$.pipe(
            select(getFriends)
        );

        this.store$.dispatch(new GetFriends());
    }
}
