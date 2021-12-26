import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendPageComponent } from './friend-page.component';
import { FriendDescriptionComponent } from '../../container/friend-description/friend-description.component';
import { LoaderComponent } from '../../container/loader/loader.component';
import { BookmarkComponent } from '../../component/bookmark/bookmark.component';
import { RatingComponent } from '../../component/rating/rating.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../store/reducer';

describe('FriendPageComponent', () => {
  let component: FriendPageComponent;
  let fixture: ComponentFixture<FriendPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendPageComponent,
        FriendDescriptionComponent,
        BreadcrumbComponent,
        LoaderComponent,
        BookmarkComponent,
        RatingComponent
      ],
      imports: [StoreModule.forRoot(appReducer, {}), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
