import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendsComponent } from './friends.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendItemComponent } from './components/friend-item/friend-item.component';
import { BookmarkComponent } from '../../shared/components/bookmark/bookmark.component';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { LoaderComponent } from '../../shared/containers/loader/loader.component';
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
        LoaderComponent
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
