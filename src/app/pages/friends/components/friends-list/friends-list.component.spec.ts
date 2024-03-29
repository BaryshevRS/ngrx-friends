import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FriendsListComponent } from './friends-list.component';
import { Friend } from '../../shared/classes/friends';
import { FriendItemComponent } from '../friend-item/friend-item.component';
import { BookmarkComponent } from '../../../../shared/components/bookmark/bookmark.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';

describe('FriendsListComponent', () => {
  let component: FriendsListComponent;
  let fixture: ComponentFixture<FriendsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsListComponent,
        FriendItemComponent,
        BookmarkComponent,
        RatingComponent
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
