import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendsPageModule} from './module/friends-page.module';
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
        FriendsPageModule
    ]
})
export class AppRoutingModule {}
