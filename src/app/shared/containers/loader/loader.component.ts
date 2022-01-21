import {
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FriendsState } from '../../../pages/friends/shared/interfaces';
import { getLoading } from '../../../store/selector/friends.selector';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    private store$: Store<FriendsState>
  ) {}

  public loading$ = this.store$.pipe(select(getLoading))
}
