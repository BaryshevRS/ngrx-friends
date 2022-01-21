import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getDescriptions } from '../../../../store/selector/friends.selector';
import { Friend } from '../../shared/classes/friends';
import { FriendsState } from '../../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html'
})
export class FriendComponent implements OnInit {
  public friend$: Observable<Friend>;

  constructor(private store$: Store<FriendsState>) {}

  ngOnInit() {
    this.friend$ = this.store$.pipe(select(getDescriptions));
  }
}
