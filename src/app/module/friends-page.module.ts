import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from './share.module';
import { FriendsListComponent } from '../component/friends-list/friends-list.component';
import { FriendsRoutingModule } from '../routing/friends-routing.module';
import { FriendItemComponent } from '../container/friend-item/friend-item.component';
import { FriendsPageComponent } from '../page/friends-page/friends-page.component';

@NgModule({
  declarations: [
    FriendsPageComponent,
    FriendsListComponent,
    FriendItemComponent
  ],
  imports: [CommonModule, ShareModule, FriendsRoutingModule],
  exports: [FriendsPageComponent]
})
export class FriendsPageModule {}
