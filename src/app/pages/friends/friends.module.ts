import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/share.module';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendItemComponent } from './components/friend-item/friend-item.component';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent, FriendsListComponent, FriendItemComponent],
  imports: [CommonModule, ShareModule, FriendsRoutingModule],
  exports: [FriendsComponent]
})
export class FriendsModule {}
