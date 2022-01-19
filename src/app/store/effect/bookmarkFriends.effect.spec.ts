import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FriendsService } from '../../service/friends.service';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Friend } from '../../class/friends';
import { HttpClientModule } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  BookmarksFriends,
  GetCountBookmarksFriends,
  GetFriends,
  LoadFriends,
  SetCountBookmarksFriends,
  ShowBookmarksFriends
} from '../action';
import { BookmarkFriendsEffect } from './bookmarkFriends.effect';
import { Friends } from '../../interface/friends';

describe('BookmarkFriendsEffect on bookmarks page', () => {
  const initialState = {
    friends: {
      friends: [new Friend('1', 'first_name', 'last_name')],
      configsFriends: {
        typeSort: 0,
        searchValue: '',
        showBookmark: true,
        startView: 0,
        limitView: 0
      },
      errors: null,
      bookmarks: {
        count: 0
      }
    }
  };

  const mockStoreLoad = {
    friends: {
      friends: [new Friend('1', 'first_name', 'last_name')]
    },
    configsFriends: {
      typeSort: 0,
      searchValue: '',
      showBookmark: true,
      startView: 0,
      limitView: 20
    },
  };

  const countBookmarksFriends = 10;

  const mockFriendsService = {
    getFriends: function (): Observable<Friend[]> {
      return of(initialState.friends.friends);
    },
    getFriend: function (): Observable<Friend> {
      return of(initialState.friends.friends[0]);
    },
    setBookmark: function (): void {
    },
    getCountBookmarksFriends: function (): Observable<number> {
      return of(countBookmarksFriends);
    },
    getFilterBookmark: function (): Friend[] {
      return initialState.friends.friends;
    }
  };

  let effects: BookmarkFriendsEffect;
  // let metadata: EffectsMetadata<BookmarkFriendsEffect>;
  let actionsMarble$: Observable<Action>;

  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BookmarkFriendsEffect,
        {provide: FriendsService, useValue: mockFriendsService},
        provideMockStore({initialState}),
        provideMockActions(() => actionsMarble$)
      ]
    });
    effects = TestBed.inject<BookmarkFriendsEffect>(BookmarkFriendsEffect);
    // metadata = getEffectsMetadata(effects);
    store = TestBed.inject(MockStore);
  });

  it('should be set bookmark', () => {
    const action = new BookmarksFriends(initialState.friends.friends[0]);
    actionsMarble$ = cold('--a-', {a: action});

    const expected = hot('--b', {
      b: new SetCountBookmarksFriends(0)
    });

    // const expected = hot('--(bc)', {
    //   b: new SetCountBookmarksFriends(0),
    //   c: new LoadFriends(mockStoreLoad.friends)
    // });

    expect(effects.SetBookmarkFriends$).toBeObservable(expected);
  });
});
