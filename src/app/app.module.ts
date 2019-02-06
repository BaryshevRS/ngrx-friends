import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
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
import {ErrorPageComponent} from './page/error-page/error-page.component';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './container/header/header.component';
import {NavComponent} from './container/nav/nav.component';
import { LoaderComponent } from './container/loader/loader.component';
import {ShareModule} from './module/share.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import {RouterModule} from '@angular/router';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        HeaderSearchComponent,
        ScrollTopComponent,
        NavSortComponent,
        FriendsPageComponent,
        FriendPageComponent,
        FriendDescription,
        ErrorPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(appReducer, {}),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 20 }) : [],
        EffectsModule.forRoot(effectsList),
        FriendsModule,
        ShareModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
/*        StoreModule.forRoot({
            router: routerReducer,
        }),*/
       // StoreRouterConnectingModule.forRoot(),
       // RouterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
