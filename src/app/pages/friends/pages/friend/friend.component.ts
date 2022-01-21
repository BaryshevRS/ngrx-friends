import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getErrors, getFriendDetails, getLoading } from '../../../../store/selector/friends.selector';
import { Friend } from '../../shared/classes/friends';
import { FriendsState } from '../../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html'
})
export class FriendComponent {
  public friend$: Observable<Friend> = this.store$.pipe(select(getFriendDetails));
  public errors$ = this.store$.pipe(select(getErrors));
  public loading$ = this.store$.pipe(select(getLoading));

  constructor(private store$: Store<FriendsState>) {}
}
