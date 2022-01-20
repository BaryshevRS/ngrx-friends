import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class FriendsPageComponent implements OnInit, OnDestroy {
  public friends$: Observable<Friend[]>;
  public errors$
  public errorMsg: boolean;

  constructor(private store$: Store<FriendsState>) {}

  // fill up page, if height content not more, than height screen
  drawing() {
    this.store$.dispatch(FriendsActions.GetFriends({}));
  }

  ngOnInit() {
    this.friends$ = this.store$
      .pipe(select(getFriends)
      );

    this.friends$.subscribe((xx) => {
      console.error('x', xx)
    })

    this.errors$ = this.store$
      .pipe(select(getErrors))
      .subscribe((error) => {
        this.errorMsg = !!(error && error.text);
      });

    this.store$.dispatch(FriendsActions.GetFriends({configsFriends: {startView: 0}}));
  }

  ngOnDestroy() {
    this.errors$.unsubscribe();
  }
}
