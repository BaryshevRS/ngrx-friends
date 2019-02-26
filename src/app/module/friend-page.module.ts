import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FriendPageComponent} from '../page/friend-page/friend-page.component';
import {FriendDescription} from '../container/friend-description/friend-description';
import {ShareModule} from './share.module';
import {FriendsRoutingModule} from '../routing/friends-routing.module';

@NgModule({
  declarations: [
    FriendPageComponent,
    FriendDescription
  ],
  imports: [
    CommonModule,
    ShareModule,
    FriendsRoutingModule
  ],
  exports: [
    FriendPageComponent
  ]
})
export class FriendPageModule { }
