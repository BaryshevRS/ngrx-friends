import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendsComponent } from './friends.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendItemComponent } from './components/friend-item/friend-item.component';
import { BookmarkComponent } from '../../shared/components/bookmark/bookmark.component';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../store/reducer';

describe('FriendsPageComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsComponent,
        BreadcrumbComponent,
        FriendsListComponent,
        FriendItemComponent,
        BookmarkComponent,
        RatingComponent,
        SpinnerComponent
      ],
      imports: [RouterTestingModule, StoreModule.forRoot(appReducer, {})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
