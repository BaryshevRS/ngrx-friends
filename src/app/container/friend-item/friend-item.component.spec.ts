import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Friend} from '../../class/friends';
import {FriendItemComponent} from './friend-item.component';
import {BookmarkComponent} from '../../component/bookmark/bookmark.component';
import {RatingComponent} from '../../component/rating/rating.component';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {appReducer} from '../../store/reducer';

describe('FriendItemComponent', () => {
    let component: FriendItemComponent;
    let fixture: ComponentFixture<FriendItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FriendItemComponent,
                BookmarkComponent,
                RatingComponent
            ],
            imports: [
                StoreModule.forRoot(appReducer, {}),
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
