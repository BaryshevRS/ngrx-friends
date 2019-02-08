import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendsModule} from './module/friends.module';
import {ErrorPageComponent} from './page/error-page/error-page.component';

const appRoutes: Routes = [
    { path: '', component: FriendsPageComponent },
    { path: '**', component: ErrorPageComponent },
];

@NgModule({
    exports: [RouterModule],
    declarations: [
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        FriendsModule
    ]
})
export class AppRoutingModule {}
