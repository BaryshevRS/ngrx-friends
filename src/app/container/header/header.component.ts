import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FriendsState } from '../../interface/friends';
import * as FriendsAction from '../../store/action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public title = 'Friends';

  constructor(private store$: Store<FriendsState>, private router: Router) {}

  initSearch(searchValue: string = '') {
    this.router.navigate(['/']);
    this.store$.dispatch(FriendsAction.SearchFriends({searchValue}));
  }
}
