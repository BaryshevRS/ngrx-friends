import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Friend } from '../../pages/friends/shared/classes/friends';
import * as FriendsActions from '../../store/action';
import { FriendsState } from '../../pages/friends/shared/interfaces';
import { Observable } from 'rxjs';
import { getBookmarksCount, getTypeSort } from '../../store/selector/friends.selector';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(private store$: Store<FriendsState>) {}
  public activeBookmark: boolean;

  public typeSort$: Observable<number> = this.store$.pipe(select(getTypeSort));
  public bookmarksCount$: Observable<number> = this.store$.pipe(select(getBookmarksCount));

  showBookmark(showBookmark: boolean = false): void {
    this.store$.dispatch(FriendsActions.ShowBookmarksFriends({showBookmark}));
    this.activeBookmark = showBookmark;
  }

  changeSort(typeSort: number) {
    this.store$.dispatch(FriendsActions.SortFriends({typeSort}));
  }

  ngOnInit() {
    this.store$.dispatch(FriendsActions.GetCountBookmarksFriends());
  }
}
