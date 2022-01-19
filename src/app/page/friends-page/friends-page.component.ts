import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Friend } from '../../class/friends';
import { GetFriends } from '../../store/action';
import { Observable } from 'rxjs';
import { getErrors, getFriends } from '../../store/selector/friends.selector';
import { ErrorMessage } from '../../class/errors';

@Component({
  selector: 'app-friends',
  templateUrl: './friends-page.component.html'
})
export class FriendsPageComponent implements OnInit, OnDestroy {
  public friends: Friend[];
  public friends$: Observable<Friend[]>;
  public errors$;
  public errorMsg: boolean;

  constructor(private store$: Store<any>) {}

  // fill up page, if height content not more, than height screen
  drawing() {
    this.store$.dispatch(new GetFriends());
  }

  ngOnInit() {
    this.friends$ = this.store$.pipe(select(getFriends));
    this.errors$ = this.store$
      .pipe(select(getErrors))
      .subscribe((error: ErrorMessage) => {
        this.errorMsg = !!(error && error.text);
      });
    this.store$.dispatch(new GetFriends());
  }

  ngOnDestroy() {
    this.errors$.unsubscribe();
  }
}
