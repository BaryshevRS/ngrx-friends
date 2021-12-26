import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FriendDescriptionComponent } from './friend-description.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../store/reducer';
import { BookmarkComponent } from '../../component/bookmark/bookmark.component';
import { RatingComponent } from '../../component/rating/rating.component';

describe('FriendDescriptionComponent', () => {
  let component: FriendDescriptionComponent;
  let fixture: ComponentFixture<FriendDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendDescriptionComponent,
        BookmarkComponent,
        RatingComponent
      ],
      imports: [StoreModule.forRoot(appReducer, {})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
