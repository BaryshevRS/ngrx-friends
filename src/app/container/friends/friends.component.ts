import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Friend} from '../../class/friends';
import {GetFriends} from '../../store/action';

// todo подписываться на данные в шаблоне
// todo добавить лоадеры и вывод ошибок, если данные недоступны
// todo продумать offline режим
// todo push change detection
// todo настройка отписки

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
        // this.issetContent = false;
    }

    ngOnInit() {
        this.store$.pipe(select('friends')).subscribe(({friends}) => {
            this.friends = friends;

            /*
                todo надо перенести в директиву, так как отрисовка документа может происходить не сразу и события
                todo дозаполнения могут приходить несколько раз
                todo issetContent заменить на передачу friends as contents
            */

            if (friends.length) {
                this.issetContent = true;
            }

            console.log('select friends', friends);
        });

        this.store$.dispatch(new GetFriends({startView: this.startView, limitView: this.limitView}));
    }
}
