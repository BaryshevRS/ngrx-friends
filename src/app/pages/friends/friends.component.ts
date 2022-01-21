import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Friend } from './shared/classes/friends';
import { Observable } from 'rxjs';
import { getErrors, getFriends, getLoading } from '../../store/selector/friends.selector';
import * as FriendsActions from '../../store/action';
import { FriendsState } from './shared/interfaces';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {
  public friends$: Observable<Friend[]> = this.store$.pipe(select(getFriends));
  public errors$ = this.store$.pipe(select(getErrors));
  public loading$ = this.store$.pipe(select(getLoading));

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
