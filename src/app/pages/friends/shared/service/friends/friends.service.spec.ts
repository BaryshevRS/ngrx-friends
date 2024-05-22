import { async, inject, TestBed } from '@angular/core/testing';
import { FriendsService } from './friends.service';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../../classes/friends';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalSaveService } from '../../../../../shared/services/local-storage/local-save.service';

describe('FriendsService', () => {
  let moskFriends;
  let moskConfigsFriends;
  let friendsService: FriendsService;
  let httpClientSpy: { get: jasmine.Spy };

  moskConfigsFriends = {
    typeSort: 0,
    searchValue: '',
    showBookmarks: false,
    startView: 0,
    limitView: 10
  };
  moskFriends = [new Friend('1', 'first_name', 'last_name')];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    const LocalSaveMosk = {
      get: () => {
      },
      set: () => {
      }
    };

    TestBed.configureTestingModule({
      providers: [
        FriendsService,
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: LocalSaveService, useValue: LocalSaveMosk}
      ],
      imports: [HttpClientTestingModule]
    });

    friendsService = TestBed.get(FriendsService);
  });

  it('should be created', inject(
    [FriendsService],
    (service: FriendsService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be get friends', async(() => {
    httpClientSpy.get.and.returnValue(of(moskFriends));

    friendsService.getFriends(moskConfigsFriends).subscribe((friends) => {
      expect({...friends}).toEqual({...moskFriends});
    }, fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'called once');
  }));

  it('should be get friend by id', async(() => {
    httpClientSpy.get.and.returnValue(of(moskFriends));

    friendsService.getFriend('1').subscribe((friend) => {
      expect({...friend}).toEqual({...moskFriends[0]});
    }, fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'called once');
  }));

  it('should be filter bookmark', inject(
    [FriendsService],
    (service: FriendsService) => {
      const serviceMoskFriends = [new Friend('1', 'first_name', 'last_name')];
      serviceMoskFriends[0].bookmark = 1;

      expect({...service.getFilterBookmark(serviceMoskFriends)}).toEqual({
        ...serviceMoskFriends
      });
    }
  ));

  it('should be get count bookmarsk friends', async(() => {
    const serviceMoskFriends = [new Friend('1', 'first_name', 'last_name')];
    serviceMoskFriends[0].bookmark = 1;

    httpClientSpy.get.and.returnValue(of(serviceMoskFriends));

    friendsService.getCountBookmarksFriends().subscribe((count) => {
      expect(count).toBe(1);
    }, fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'called once');
  }));
});
