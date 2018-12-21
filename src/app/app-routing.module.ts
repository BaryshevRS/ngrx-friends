import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendPageComponent} from './page/friend-page/friend-page.component';
import {AuthPageComponent} from './page/auth-page/auth-page.component';

const appRoutes: Routes = [
    { path: '', component: FriendsPageComponent },
    { path: 'friends', component: FriendsPageComponent },
    { path: 'friends/:id', component: FriendPageComponent },
    { path: 'auth', component: AuthPageComponent },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule {}
