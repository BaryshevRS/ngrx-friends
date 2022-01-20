import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Friend } from '../../class/friends';
import { Observable } from 'rxjs';
import { getErrors, getFriends } from '../../store/selector/friends.selector';
import * as FriendsActions from '../../store/action';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-friends',
  templateUrl: './friends-page.component.html'
})
export class FriendsPageComponent implements OnInit {
  public friends$: Observable<Friend[]> = this.store$.pipe(select(getFriends));
  public errors$ = this.store$.pipe(select(getErrors))

  constructor(private store$: Store<FriendsState>) {}

  // fill up page, if height content not more, than height screen
  drawing() {
    this.store$.dispatch(FriendsActions.GetFriends({}));
  }

  ngOnInit() {
    this.store$.dispatch(FriendsActions.GetFriends({}));

    this.friends$.subscribe(console.log)
  }
}
