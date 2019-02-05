import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import {HeaderComponent} from './container/header/header.component';
import {NavComponent} from './container/nav/nav.component';
import {HeaderSearchComponent} from './component/header-search/header-search.component';
import {ScrollTopComponent} from './component/scroll-top/scroll-top.component';
import {NavSortComponent} from './component/nav-sort/nav-sort.component';
import {FriendsPageComponent} from './page/friends-page/friends-page.component';
import {FriendDescription} from './component/friends/friend-description/friend-description';
import {ErrorPageComponent} from './page/error-page/error-page.component';
import {FriendPageComponent} from './page/friend-page/friend-page.component';
import {FriendsModule} from './module/friends.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {effectsList} from './store/effect';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                HttpClientModule,
                AppRoutingModule,
                // FormsModule,
                // ReactiveFormsModule,
                StoreModule.forRoot(appReducer, {}),
                EffectsModule.forRoot(effectsList),
                FriendsModule,
            ],
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
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

/*    it(`should have as title 'hero'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('hero');
    });

    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to hero!');
    });*/
});
