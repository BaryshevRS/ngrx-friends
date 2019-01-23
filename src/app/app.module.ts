import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
// import {HeaderComponent} from './container/header/header.component';
// import {NavComponent} from './container/nav/nav.component';
import {HeaderSearchComponent} from './component/header-search/header-search.component';
import {AppRoutingModule} from './app-routing.module';
import {ScrollTopComponent} from './component/scroll-top/scroll-top.component';

import {appReducer} from './store/reducer';
import {environment} from '../environments/environment.prod';
import {effectsList} from './store/effect';
import {FriendsModule} from './module/friends.module';

import {NavSortComponent} from './component/nav-sort/nav-sort.component';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendPageComponent} from './page/friend-page/friend-page.component';
import {FriendDescription} from './component/friends/friend-description/friend-description';
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {ErrorPageComponent} from './page/error-page/error-page.component';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './container/header/header.component';
import {NavComponent} from './container/nav/nav.component';
// import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        HeaderSearchComponent,
        ScrollTopComponent,
        NavSortComponent,
        FriendsPageComponent,
        AuthPageComponent,
        FriendPageComponent,
        FriendDescription,
        ErrorPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        // FormsModule,
        // ReactiveFormsModule,
       // BrowserAnimationsModule,
        StoreModule.forRoot(appReducer, {}),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 20 }) : [],
        EffectsModule.forRoot(effectsList),
        FriendsModule,
/*        StoreModule.forRoot({
            router: routerReducer,
        }),*/
       // StoreRouterConnectingModule.forRoot(),
       // RouterModule
    ],
    exports: [
        // HeaderSearchComponent,
        // NavComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
