import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Friend } from './shared/classes/friends';
import { Observable } from 'rxjs';
import { getErrors, getFriends, getLoading } from '../../store/selector/friends.selector';
import * as FriendsActions from '../../store/action';
import { FriendsState } from './shared/interfaces';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {
  public friends$: Observable<Friend[]> = this.store$.pipe(select(getFriends));
  public errors$ = this.store$.pipe(select(getErrors));
  // Delay fixed render error
  public loading$ = this.store$.pipe(delay(0), select(getLoading));

  constructor(private store$: Store<FriendsState>) {
  }

  // Fill up page. If height content not more, than height screen
  drawing() {
    this.store$.dispatch(FriendsActions.GetFriends({configsFriends: {}}));
  }

  ngOnInit() {
    this.store$.dispatch(FriendsActions.GetFriends({configsFriends: {}}));
  }
}
