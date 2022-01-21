import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendComponent } from './friend.component';

const appRoutes: Routes = [
  { path: 'friends/:id', component: FriendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}
