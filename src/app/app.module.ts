import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment.prod';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { appReducer } from './store/reducer';
import { appEffects } from './store/effect';

import { AppRoutingModule } from './app-routing.module';
import { FriendsModule } from './pages/friends/friends.module';
import { FriendModule } from './pages/friends/pages/friend/friend.module';
import { ShareModule } from './shared/share.module';

import { AppComponent } from './app.component';
import { HeaderSearchComponent } from './containers/header/components/header-search/header-search.component';
import { NavSortComponent } from './containers/nav/components/nav-sort/nav-sort.component';
import { HeaderComponent } from './containers/header/header.component';
import { NavComponent } from './containers/nav/nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderSearchComponent,
    NavComponent,
    NavSortComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ShareModule,
    FriendsModule,
    FriendModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
