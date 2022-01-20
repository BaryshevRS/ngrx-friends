import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Friend } from '../../class/friends';
import * as FriendsActions from '../../store/action';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  constructor(private store$: Store<FriendsState>) {}

  public typeSort: number = 0;
  public countBookmark = 0;
  public activeBookmark: boolean;
  public nav$;

  showBookmark(showBookmark?: boolean): void {
    this.store$.dispatch(FriendsActions.ShowBookmarksFriends({showBookmark}));
    this.activeBookmark = showBookmark || false;
  }

  changeSort(typeSort: number) {
    this.store$.dispatch(FriendsActions.SortFriends({typeSort}));
  }

  ngOnInit() {
    this.nav$ = this.store$
      .subscribe(({ bookmarks, configsFriends }) => {
        console.log('nav', configsFriends)
        // this.countBookmark = bookmarks.count || 0;
        // this.countBookmark = this.countBookmark < 0 ? 0 : this.countBookmark;
        // this.typeSort = configsFriends.typeSort || 0;
      });

    // todo: delete
    // this.store$.dispatch(FriendsActions.GetCountBookmarksFriends()); //
  }

  ngOnDestroy() {
    if (this.nav$) {
      this.nav$.unsubscribe();
    }
  }
}
