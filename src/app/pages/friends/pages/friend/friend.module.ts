import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from './friend.component';
import { FriendDetailsComponent } from './containers/friend-details/friend-details.component';
import { ShareModule } from '../../../../shared/share.module';
import { FriendRoutingModule } from './friend-routing.module';

@NgModule({
  declarations: [FriendComponent, FriendDetailsComponent],
  imports: [CommonModule, ShareModule, FriendRoutingModule],
  exports: [FriendComponent]
})
export class FriendModule {
}
