import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../type/store/action';
import {SortFriends} from '../../store/action';
import {Friend} from '../../class/friends';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private store$: Store<FriendsAction>) {}

    public typeSort: number;
    public countBookmark = 0;
    public activeBookmark: boolean;
    public friends: Friend[];

    // записываем число друзей в избранном
    setStore(): void {
        this.store$.pipe(select('friends', )).subscribe(({friends, configsFriends}) => {
            this.friends = friends;
            // todo нужен отдельный запрос на сервер, так как стейт не содержит все значения с сервера
            // this.countBookmark = friends.reduce((a: number, friend) => friend.bookmark > 0 ? ++a : a, 0);
            this.typeSort = configsFriends.typeSort;
        });
    }

    showBookmark(active?: boolean): boolean {
        this.activeBookmark = active || false;

        // устанавливаем контекст фильтра по закладкам
        // this.bookmarkService.filterBookmark(this.activeBookmark);
        return false;
    }

    changeSort(typeSort: number) {
        // todo сервис сюда
        this.store$.dispatch(new SortFriends(typeSort)); // typeSort
    }

    ngOnInit() {
        this.setStore();
    }

}
