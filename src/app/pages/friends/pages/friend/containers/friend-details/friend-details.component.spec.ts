import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FriendDetailsComponent } from './friend-details.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../../../../store/reducer';
import { BookmarkComponent } from '../../../../../../shared/components/bookmark/bookmark.component';
import { RatingComponent } from '../../../../../../shared/components/rating/rating.component';

describe('FriendDescriptionComponent', () => {
  let component: FriendDetailsComponent;
  let fixture: ComponentFixture<FriendDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendDetailsComponent,
        BookmarkComponent,
        RatingComponent
      ],
      imports: [StoreModule.forRoot(appReducer, {})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
