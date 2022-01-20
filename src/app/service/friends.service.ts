import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { Friend } from '../class/friends';
import { LocalSaveService } from './local-save.service';
import { ConfigsFriends } from '../interface/friends';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  public BASE_URL = environment.api.baseUrl + environment.api.friendData;
  public nameFriendsRating = 'friendsRating';
  public nameFriendsBookmark = 'friendsBookmark';

  constructor(private http: HttpClient, private LocalSave: LocalSaveService) {}

  public getFriends({
    typeSort = 0,
    searchValue = '',
    showBookmark = false,
    startView = 0,
    limitView = 0
  }: ConfigsFriends): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.BASE_URL).pipe(
      delay(400), // emulate delay
      map((friendsList: Friend[]) => this.getRating(friendsList)),
      map((friendsList: Friend[]) => this.getBookmark(friendsList)),
      map((friendsList: Friend[]) => this.setRatingSort(friendsList, typeSort)),
      map((friendsList: Friend[]) =>
        showBookmark ? this.getFilterBookmark(friendsList) : friendsList
      ),
      map((friendsList: Friend[]) =>
        searchValue
          ? this.getFilterSearch(friendsList, searchValue)
          : friendsList
      ),
      map((friendsList: Friend[]) =>
        this.setLimitViewOnPage(friendsList, startView, limitView)
      ),
      catchError(({ status }: Response) => throwError(status))
    );
  }

  public getFriend(id: string): Observable<Friend> {
    return this.http.get<Friend[]>(this.BASE_URL).pipe(
      delay(400), // emulate delay
      map((friendsList: Friend[]) => this.getRating(friendsList)),
      map((friendsList: Friend[]) => this.getBookmark(friendsList)),
      map((friendsList: Friend[]) => this.findId(id, friendsList)),
      catchError(({ status }: Response) => throwError(status))
    );
  }

  private findId(id: string, friendsList: Friend[]): Friend {
    return (
      friendsList.find((friend: Friend) => id === friend.id) || new Friend()
    );
  }

  public getCountBookmarksFriends(): Observable<number> {
    return this.http.get<Friend[]>(this.BASE_URL).pipe(
      delay(400), // emulate delay
      map((friendsList: Friend[]) => {
        friendsList = this.getBookmark(friendsList);
        friendsList = friendsList.filter((friend) => friend.bookmark);
        return friendsList.reduce(
          (a: number, friend: Friend) => (friend.bookmark ? ++a : a),
          0
        );
      }),
      catchError(({ status }: Response) => throwError(status))
    );
  }

  private getRating(friendsList: Friend[]): Friend[] {
    const friendsRating: Record<string, any> = this.LocalSave.get(
      this.nameFriendsRating
    );
    if (friendsRating) {
      return friendsList.map((friend, index) => {
        if (friend.id) {
          friend.rating = friendsRating[friend.id]
            ? friendsRating[friend.id]
            : 0;
        }
        return friend;
      });
    }
    return friendsList;
  }

  private getBookmark(friendsList: Friend[]): Friend[] {
    const friendsBookmark: Record<string, any> = this.LocalSave.get(
      this.nameFriendsBookmark
    );
    if (friendsBookmark) {
      return friendsList.map((friend, index) => {
        if (friend.id) {
          friend.bookmark = friendsBookmark[friend.id]
            ? friendsBookmark[friend.id]
            : 0;
        }
        return friend;
      });
    }
    return friendsList;
  }

  // save locally user bookmarks
  public setBookmark(id: string, bookmark: boolean): void {
    this.LocalSave.set(this.nameFriendsBookmark, { [id]: bookmark });
  }

  // save locally user rating
  public setRating(id: string, value: number): void {
    this.LocalSave.set(this.nameFriendsRating, { [id]: value });
  }

  public setRatingSort(friendsList: Friend[], typeSort: number): Friend[] {
    return friendsList.sort((a: Friend, b: Friend): number => {
      switch (typeSort) {
        case 1:
          return b.rating - a.rating;
        case 2:
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }

  public getFilterBookmark(friendsList: Friend[]): Friend[] {
    return friendsList.filter((friend) => friend.bookmark);
  }

  private getFilterSearch(friendsList: Friend[], search: string): Friend[] {
    return friendsList.filter((friend) => {
      return (
        friend.first_name
          .trim()
          .toLowerCase()
          .indexOf(search.trim().toLowerCase()) >= 0 ||
        friend.last_name
          .trim()
          .toLowerCase()
          .indexOf(search.trim().toLowerCase()) >= 0
      );
    });
  }

  private setLimitViewOnPage(
    friendsList: Friend[],
    startView: number,
    limitView: number
  ): Friend[] {
    return friendsList.slice(startView, startView + limitView);
  }
}
