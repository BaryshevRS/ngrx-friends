import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment.prod';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
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

import { APP_BASE_HREF } from '@angular/common';
import { HttpLoaderFactory } from './shared/factories/translate-http-loader';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(appReducer),
        StoreRouterConnectingModule.forRoot(),
        !environment.production
          ? StoreDevtoolsModule.instrument({ maxAge: 20 })
          : [],
        EffectsModule.forRoot(appEffects),
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
      declarations: [
        AppComponent,
        HeaderComponent,
        HeaderSearchComponent,
        NavComponent,
        NavSortComponent,
        NotFoundComponent
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
