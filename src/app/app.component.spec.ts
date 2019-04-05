import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {environment} from '../environments/environment.prod';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {appReducer} from './store/reducer';
import {effectsList} from './store/effect';

import {AppRoutingModule} from './app-routing.module';
import {FriendsPageModule} from './module/friends-page.module';
import {FriendPageModule} from './module/friend-page.module';
import {ShareModule} from './module/share.module';

import {AppComponent} from './app.component';
import {HeaderSearchComponent} from './component/header-search/header-search.component';
import {ScrollTopComponent} from './component/scroll-top/scroll-top.component';
import {NavSortComponent} from './component/nav-sort/nav-sort.component';
import {HeaderComponent} from './container/header/header.component';
import {NavComponent} from './container/nav/nav.component';
import {ErrorPageComponent} from './page/error-page/error-page.component';

import {APP_BASE_HREF} from '@angular/common';
import {HttpLoaderFactory} from './factory/translate-http-loader';

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
                StoreRouterConnectingModule,
                !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 20 }) : [],
                EffectsModule.forRoot(effectsList),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }),
                ShareModule,
                FriendsPageModule,
                FriendPageModule,
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
                HeaderSearchComponent,
                NavComponent,
                NavSortComponent,
                ScrollTopComponent,
                ErrorPageComponent
            ],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
