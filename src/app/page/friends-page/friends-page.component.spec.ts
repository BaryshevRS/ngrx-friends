import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BreadcrumbComponent} from '../../component/breadcrumb/breadcrumb.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FriendsPageComponent} from './friends-page.component';
import {FriendsListComponent} from '../../component/friends-list/friends-list.component';
import {FriendItemComponent} from '../../container/friend-item/friend-item.component';
import {BookmarkComponent} from '../../component/bookmark/bookmark.component';
import {RatingComponent} from '../../component/rating/rating.component';
import {LoaderComponent} from '../../container/loader/loader.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from '../../store/reducer';

describe('FriendsPageComponent', () => {
    let component: FriendsPageComponent;
    let fixture: ComponentFixture<FriendsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FriendsPageComponent,
                BreadcrumbComponent,
                FriendsListComponent,
                FriendItemComponent,
                BookmarkComponent,
                RatingComponent,
                LoaderComponent
            ],
            imports: [
                RouterTestingModule,
                StoreModule.forRoot(appReducer, {}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
