import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendComponent } from './friend.component';
import { FriendDetailsComponent } from './containers/friend-details/friend-details.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BookmarkComponent } from '../../../../shared/components/bookmark/bookmark.component';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../../store/reducer';

describe('FriendPageComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendComponent,
        FriendDetailsComponent,
        BreadcrumbComponent,
        SpinnerComponent,
        BookmarkComponent,
        RatingComponent
      ],
      imports: [StoreModule.forRoot(appReducer, {}), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
