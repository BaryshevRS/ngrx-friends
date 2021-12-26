import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Friend } from '../../class/friends';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsListComponent {
  @Input() contents: Friend[];

  trackByFn(index: number, item: Friend) {
    return item.id;
  }
}
