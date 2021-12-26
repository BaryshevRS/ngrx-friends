import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FriendsService } from '../../service/friends.service';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Friend } from '../../class/friends';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadFriends, RatingFriends } from '../action';
import { RatingFriendsEffect } from './ratingFriends.effect';

describe('RatingFriendsEffect', () => {
  describe('Rating friends', () => {
    const moskStore = {
      friends: {
        friends: [new Friend('1', 'first_name', 'last_name')],
        configsFriends: {
          typeSort: 1,
          searchValue: '',
          showBookmark: false,
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
      setRating: function (): void {},
      setRatingSort: function (): Friend[] {
        return moskStore.friends.friends;
      }
    };

    let effects: RatingFriendsEffect;
    let metadata: EffectsMetadata<RatingFriendsEffect>;
    let actionsMarble: Observable<any>;

    let store: MockStore<any>;
    const initialState = moskStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          RatingFriendsEffect,
          { provide: FriendsService, useValue: mockFriendsService },
          provideMockStore({ initialState }),
          provideMockActions(() => actionsMarble)
        ]
      });

      effects = TestBed.get(RatingFriendsEffect);
      metadata = getEffectsMetadata(effects);
      store = TestBed.get(Store);
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

    it('should be set rating when sort', () => {
      const action = new RatingFriends(moskStore.friends.friends[0]);
      const completion = new LoadFriends(moskStore.friends);

      actionsMarble = cold('--a-', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.SetRatingFriends$).toBeObservable(expected);
    });

    it('should register GetCountBookmarksFriends$ that dispatches an action', () => {
      expect(metadata.SetRatingFriends$).toEqual({
        dispatch: true,
        resubscribeOnError: true
      });
    });
  });
});
