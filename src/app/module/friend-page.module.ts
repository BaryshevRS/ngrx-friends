import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendPageComponent } from '../page/friend-page/friend-page.component';
import { FriendDescriptionComponent } from '../container/friend-description/friend-description.component';
import { ShareModule } from './share.module';
import { FriendRoutingModule } from '../routing/friend-routing.module';

@NgModule({
  declarations: [FriendPageComponent, FriendDescriptionComponent],
  imports: [CommonModule, ShareModule, FriendRoutingModule],
  exports: [FriendPageComponent]
})
export class FriendPageModule {}
