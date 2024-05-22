import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FriendsService } from '../../pages/friends/shared/service/friends/friends.service';
import { TestBed } from '@angular/core/testing';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Friend } from '../../pages/friends/shared/classes/friends';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterEffects } from './router.effect';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RouterEffects', () => {
  const moskStore = {
    friends: {
      friends: [new Friend('1', 'first_name', 'last_name')],
      configsFriends: {
        typeSort: 1,
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

  let effects: RouterEffects;
  let metadata: EffectsMetadata<RouterEffects>;
  let actionsMarble: ReplaySubject<any>;

  let store: MockStore<any>;
  const initialState = moskStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RouterEffects,
        {provide: FriendsService, useValue: mockFriendsService},
        provideMockStore({initialState}),
        provideMockActions(() => actionsMarble)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    effects = TestBed.get(RouterEffects);
    metadata = getEffectsMetadata(effects);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should be load friend when routing', () => {
    const payload = {
      routerState: {
        root: {
          firstChild: {
            routeConfig: {
              path: 'friends/:id'
            },
            params: {
              id: '1'
            }
          }
        }
      }
    };

    actionsMarble = new ReplaySubject(1);
    actionsMarble.next({type: ROUTER_NAVIGATION, payload});

    // effects.routeChange$.subscribe((result) => {
    //   expect(result).toEqual(new GetFriend('1'));
    // });
  });

  // it('should register routeChange$ that dispatches an action', () => {
  //   expect(metadata.routeChange$).toEqual({
  //     dispatch: true,
  //     resubscribeOnError: true
  //   });
  // });
});
