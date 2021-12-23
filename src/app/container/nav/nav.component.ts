import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';
import {GetCountBookmarksFriends, ShowBookmarksFriends, SortFriends} from '../../store/action';
import {Friend} from '../../class/friends';
import { getFriendsState } from '../../store/selector/friends.selector';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

    constructor(private store$: Store<FriendsAction>) {}

    public typeSort: number;
    public countBookmark = 0;
    public activeBookmark: boolean;
    public friends: Friend[];
    public nav$;

    showBookmark(active?: boolean): void {
        this.store$.dispatch(new ShowBookmarksFriends(active));
        this.activeBookmark = active || false;
    }

    changeSort(typeSort: number) {
        this.store$.dispatch(new SortFriends(typeSort));
    }

    ngOnInit() {
        this.nav$ = this.store$.pipe(
          select(getFriendsState)
        ).subscribe(({bookmarks, configsFriends}) => {
            this.countBookmark = bookmarks.count || 0;
            this.countBookmark = this.countBookmark < 0 ? 0 : this.countBookmark;
            this.typeSort = configsFriends.typeSort || 0;
        });

        this.store$.dispatch(new GetCountBookmarksFriends());
    }

    ngOnDestroy() {
        if (this.nav$) {
            this.nav$.unsubscribe();
        }
    }
}
