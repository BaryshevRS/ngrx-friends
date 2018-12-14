import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Friend} from '../../class/friends';
import {GetFriends} from '../../store/action';
import {Observable} from 'rxjs';
import {getFriends} from '../../store/selector/friends.selector';

// todo подписываться на данные в шаблоне
// todo добавить лоадеры и вывод ошибок, если данные недоступны
// todo push change detection
// todo настройка отписки
// todo скролл на вверх
// todo переход по логотипу

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

    public friends: Friend[];
    public startView = 0;
    public limitView = 4;
    public issetContent = false;
    public friends$: Observable<Friend[]>;

    constructor(
        private store$: Store<any>
    ) {}

    // отслеживание подгрузки по скролу
    setScrollingActive(isScrolling: false) {
        if ( isScrolling ) {
            console.log('setScrollingActive');
            // todo сделать проверку, когда больше нет друзей, чтоб счётчик сбрасывался
            this.startView = this.startView + this.limitView;
            this.issetContent = false; // отключаем дорисовку при инициализации
            this.store$.dispatch(new GetFriends({startView: this.startView, limitView: this.limitView}));
        }
    }

    // дозаполнение страницы, если выведенного контента меньше, чем высота экрана
    initFilling() {
        console.log('initFilling');

        this.startView = this.startView + this.limitView;
        this.store$.dispatch(new GetFriends({startView: this.startView, limitView: this.limitView}));

    }

    ngOnInit() {
       /* this.store$.pipe(select('friends')).subscribe(({friends}) => {
            /!*
                todo issetContent заменить на передачу friends as contents
                todo лучше передавать друзей в директиву, так можно решить проблему двойной загрузки
            *!/

            if (friends.length) {
                this.friends = friends;
                this.issetContent = true;
            }
        });*/

        this.friends$ = this.store$.select(getFriends);
        this.store$.dispatch(new GetFriends( {}));
    }
}
