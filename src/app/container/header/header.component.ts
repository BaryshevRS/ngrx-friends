import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFriends } from '../../store/action';
import { Store } from '@ngrx/store';
import { FriendsAction } from '../../store/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public title = 'Friends';

  constructor(private store$: Store<FriendsAction>, private router: Router) {}

  initSearch(term: string) {
    this.router.navigate(['/']);
    this.store$.dispatch(new SearchFriends(term));
  }
}
