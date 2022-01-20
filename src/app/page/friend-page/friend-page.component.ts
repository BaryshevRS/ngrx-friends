import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getDescriptions } from '../../store/selector/friends.selector';
import { Friend } from '../../class/friends';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friend-page.component.html'
})
export class FriendPageComponent implements OnInit, OnDestroy {
  private friend$;
  public friend: Friend;

  constructor(private store$: Store<FriendsState>) {}

  ngOnInit() {
    this.friend$ = this.store$
      .pipe(select(getDescriptions))
      .subscribe((friend) => {
        this.friend = friend;
      });
  }

  ngOnDestroy() {
    if (this.friend$) {
      this.friend$.unsubscribe();
    }
  }
}
