import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './container/header/header.component';
import {HeaderSearchComponent} from './component/header-search/header-search.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollTopComponent} from './component/scroll-top/scroll-top.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment.prod';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {effectsList} from './store/effect';
import {FriendsModule} from './module/friends.module';
import {NavComponent} from './container/nav/nav.component';
import {NavSortComponent} from './component/nav-sort/nav-sort.component';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendPageComponent} from './page/friend-page/friend-page.component';
import {FriendDescription} from './component/friends/friend-description/friend-description';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HeaderSearchComponent,
        ScrollTopComponent,
        NavComponent,
        NavSortComponent,
        FriendsPageComponent,
        FriendPageComponent,
        FriendDescription
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(appReducer, {}),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 20 }) : [],
        EffectsModule.forRoot(effectsList),
        FriendsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
