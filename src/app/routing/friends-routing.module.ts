import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from '../page/friends-page/friends-page.component';
import {FriendPageComponent} from '../page/friend-page/friend-page.component';

const appRoutes: Routes = [
    // { path: 'friends', component: FriendsPageComponent },
    { path: 'friends/:id', component: FriendPageComponent},
];

@NgModule({
    exports: [ RouterModule ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class FriendsRoutingModule {}
