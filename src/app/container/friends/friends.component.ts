import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {FriendsService} from '../../service/friends.service';
import {Friend} from '../../class/friends';
import {friendsActionTypes} from '../../type/store/action';
import {GetFriends} from '../../store/action';

// todo подписываться на данные в шаблоне
// todo добавить лоадеры и вывод ошибок, если данные недоступны
// todo продумать offline режим

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})

export class FriendsComponent  implements OnInit {

    public friends: Friend[];
    public startView = 0;
    public stepView = 4;
    public issetContent = false;

    constructor(
        private store$: Store<any>,
        private friendsService: FriendsService
    ) {}

    loadFriends(): void {
        this.friendsService.loadFriends(
            0,
            '',
            false,
            this.startView
        ).subscribe((friendsList) => {
            this.friends = friendsList;
            this.issetContent = true;
        });
    }

    // отслеживание подгрузки по скролу
    setScrollingActive(isScrolling: false) {
        if ( isScrolling ) {
            console.log('setScrollingActive');
            // todo сделать проверку, когда больше нет друзей, чтоб счётчик сбрасывался
            this.startView = this.startView + this.stepView;
            this.issetContent = false;
            this.loadFriends();
        }
    }

    // дозаполнение страницы, если выведенного контента меньше, чем высота экрана
    initFilling() {
        console.log('initFilling');

        this.startView = this.startView + this.stepView;
        // this.issetScrollContent = false;
        this.loadFriends();
    }

    ngOnInit() {
        this.store$.pipe(select('friends')).subscribe(({friends}) => {
            this.friends = friends;
            this.issetContent = true;
            console.log('select friends');
        });

        this.store$.dispatch(new GetFriends());
    }
}
