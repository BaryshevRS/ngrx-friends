import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type/index';
import {GetCountBookmarksFriends, GetFriends, ShowBookmarksFriends, SortFriends} from '../../store/action';
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

    showBookmark(active?: boolean): void {
        this.store$.dispatch(new ShowBookmarksFriends(active));

        this.activeBookmark = active || false;
    }

    changeSort(typeSort: number) {
        this.store$.dispatch(new SortFriends(typeSort));
    }

    ngOnInit() {
        // todo подписаться только к закладкам и конфигу
        this.store$.pipe(select('friends')).subscribe(({bookmarks, configsFriends}) => {
            this.countBookmark = bookmarks.count || 0;
            this.typeSort = configsFriends.typeSort || 0;
        });

        this.store$.dispatch(new GetCountBookmarksFriends());
    }

}
