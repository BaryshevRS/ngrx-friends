import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {FriendsModule} from './module/friends.module';
import {FriendPageComponent} from './page/friend-page/friend-page.component';
import {FriendDescription} from './component/friends/friend-description/friend-description';

const appRoutes: Routes = [
    { path: '', component: FriendsPageComponent },
    { path: 'auth', component: AuthPageComponent },
];

@NgModule({
    exports: [ RouterModule],
    declarations: [
        FriendsPageComponent,
        AuthPageComponent,
        FriendPageComponent,
        FriendDescription
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        FriendsModule
    ]
})
export class AppRoutingModule {}
