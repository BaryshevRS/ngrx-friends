import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendPageComponent} from '../page/friend-page/friend-page.component';

const appRoutes: Routes = [
    { path: 'friends/:id', component: FriendPageComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [ RouterModule ]
})
export class FriendRoutingModule {}
