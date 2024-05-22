import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { FriendComponent } from './pages/friend/friend.component';

const appRoutes: Routes = [
  {path: 'friends', component: FriendsComponent},
  {path: 'friends/:id', component: FriendComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule {
}
