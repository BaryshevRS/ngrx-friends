import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FriendsService } from '../../pages/friends/shared/service/friends/friends.service';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Friend } from '../../pages/friends/shared/classes/friends';
import { FriendsEffect } from './friends.effect';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  ErrorsFriends,
  GetFriend,
  GetFriends,
  LoadFriends,
  SetFriendDetails
} from '../action';
import { ErrorMessage } from '../../pages/friends/shared/classes/errors';

describe('FriendsEffect', () => {
  describe('Load Friends', () => {
    const moskStore = {
      friends: {
        friends: [new Friend('1', 'first_name', 'last_name')],
        configsFriends: {
          typeSort: 0,
          searchValue: '',
          showBookmarks: false,
          startView: 0,
          limitView: 0
        },
        errors: null
      }
    };

    const mockFriendsService = {
      getFriends: function (): Observable<Friend[]> {
        return of(moskStore.friends.friends);
      },
      getFriend: function (): Observable<Friend> {
        return of(moskStore.friends.friends[0]);
      }
    };

    let effects: FriendsEffect;
    let metadata: EffectsMetadata<FriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          FriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.inject(FriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

/*    it('should be load friends', () => {
      const action = new GetFriends();
      const completion = new LoadFriends(moskStore.friends);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriends$).toBeObservable(expected);
    });*/

  /*  it('should be get friend by id', () => {
      const action = new GetFriend('1');
      const completion = new SetFriendDetails(moskStore.friends.friends[0]);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriend$).toBeObservable(expected);
    });*/

    // it('should register getFriends$ that dispatches an action', () => {
    //   expect(metadata.getFriends$).toEqual({
    //     dispatch: true,
    //     resubscribeOnError: true
    //   });
    // });
    //
    // it('should register getFriend$ that dispatches an action', () => {
    //   expect(metadata.getFriend$).toEqual({
    //     dispatch: true,
    //     resubscribeOnError: true
    //   });
    // });
  });

  describe('Catch Error load friends', () => {
    const moskStore = {
      friends: {
        friends: [],
        configsFriends: {
          typeSort: 0,
          searchValue: '',
          showBookmarks: false,
          startView: 0,
          limitView: 0
        },
        errors: null
      }
    };

    const mockFriendsService = {
      getFriends: function (): Observable<Friend[]> {
        return throwError(true);
      }
    };

    let effects: FriendsEffect;
    let metadata: EffectsMetadata<FriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          FriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.get(FriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

/*    it('should be error empty load friends', () => {
      const action = new GetFriends();
      const completion = new ErrorsFriends(
        new ErrorMessage('danger', 'errorMessage.friendsEmpty')
      );

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriends$).toBeObservable(expected);
    });*/
  });

  describe('Empty friends list', () => {
    let moskStore = {
      friends: {
        friends: [],
        configsFriends: {
          typeSort: 0,
          searchValue: '',
          showBookmarks: false,
          startView: 0,
          limitView: 0
        },
        errors: null
      }
    };

    const mockFriendsService = {
      getFriends: function (): Observable<Friend[]> {
        return of(moskStore.friends.friends);
      }
    };

    let effects: FriendsEffect;
    let metadata: EffectsMetadata<FriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          FriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.get(FriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

/*    it('should be load empty friends list', () => {
      const action = new GetFriends();

      moskStore = {
        ...moskStore,
        friends: {
          ...moskStore.friends,
          errors: new ErrorMessage('info', 'errorMessage.friendsEmpty')
        }
      };

      const completion = new LoadFriends(moskStore.friends);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriends$).toBeObservable(expected);
    });*/
  });

  describe('Empty search list', () => {
    let moskStore = {
      friends: {
        friends: [],
        configsFriends: {
          typeSort: 0,
          searchValue: 'test',
          showBookmarks: false,
          startView: 0,
          limitView: 0
        },
        errors: null
      }
    };

    const mockFriendsService = {
      getFriends: function (): Observable<Friend[]> {
        return of(moskStore.friends.friends);
      }
    };

    let effects: FriendsEffect;
    let metadata: EffectsMetadata<FriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          FriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.get(FriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

/*    it('should be not load result for search', () => {
      const action = new GetFriends();

      moskStore = {
        ...moskStore,
        friends: {
          ...moskStore.friends,
          errors: new ErrorMessage('info', 'errorMessage.searchEmpty')
        }
      };

      const completion = new LoadFriends(moskStore.friends);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriends$).toBeObservable(expected);
    });*/
  });

  describe('Empty bookmark list', () => {
    let moskStore = {
      friends: {
        friends: [],
        configsFriends: {
          typeSort: 0,
          searchValue: '',
          showBookmarks: true,
          startView: 0,
          limitView: 0
        },
        errors: null
      }
    };

    const mockFriendsService = {
      getFriends: function (): Observable<Friend[]> {
        return of(moskStore.friends.friends);
      }
    };

    let effects: FriendsEffect;
    let metadata: EffectsMetadata<FriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          FriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.get(FriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

/*    it('should be not load bookmark list', () => {
      const action = new GetFriends();

      moskStore = {
        ...moskStore,
        friends: {
          ...moskStore.friends,
          errors: new ErrorMessage('info', 'errorMessage.bookmarkEmpty')
        }
      };

      const completion = new LoadFriends(moskStore.friends);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getFriends$).toBeObservable(expected);
    });*/
  });
});
