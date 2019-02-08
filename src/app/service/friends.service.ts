import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, delay, filter} from 'rxjs/operators';

import {Friend} from '../class/friends';
import {LocalSaveService} from './local-save.service';
import {IGetFriends} from '../interface/friends';

@Injectable({
    providedIn: 'root'
})

export class FriendsService {

    public BASE_URL = 'http://localhost:3000/';

    public nameFriendsRating = 'friendsRating';
    public nameFriendsBookmark = 'friendsBookmark';

    constructor(private http: HttpClient,
                private LocalSave: LocalSaveService) {
    }

    public getFriends({typeSort = 0, searchValue = '', showBookmark = false, startView = 0, limitView = 0}: IGetFriends): Observable<Friend[]> {

        return this.http.get(this.BASE_URL + 'friends')
            .pipe(
                delay(400), // todo test delay
                map((friendsList: Friend[]) => this.getRating(friendsList)),
                map((friendsList: Friend[]) => this.getBookmark(friendsList)),
                map((friendsList: Friend[]) => this.setRatingSort(friendsList, typeSort)),
                map((friendsList: Friend[]) => showBookmark ? this.getFilterBookmark(friendsList) : friendsList),
                map((friendsList: Friend[]) => searchValue ? this.getFilterSearch(friendsList, searchValue) : friendsList),
                map((friendsList: Friend[]) => this.setLimitViewOnPage(friendsList, startView, limitView)),
                catchError(({status}: Response) => throwError(status))
            );
    }

    public getFriend(id: string): Observable<Friend> {
        return this.http.get(this.BASE_URL + `friends?id=${id}`)
            .pipe(
                delay(400), // todo test delay
                map((friendsList: Friend[]) => friendsList[0]),
                catchError(({status}: Response) => throwError(status))
            );
    }

    // получаем число закладок друзей
    public getCountBookmarskFriends(): Observable<number> {
        return this.http.get(this.BASE_URL + 'friends')
            .pipe(
                map((friendsList: Friend[]) => {
                    friendsList = this.getBookmark(friendsList);
                    friendsList = friendsList.filter(friend => friend.bookmark);
                    return friendsList.reduce((a: number, friend: Friend) => friend.bookmark > 0 ? ++a : a, 0);
                }),
                catchError(({status}: Response) => throwError(status))
            );
    }

    public getRating(friendsList: Friend[]): Friend[] {
        const friendsRating: object = this.LocalSave.get(this.nameFriendsRating);
        if (friendsRating) {
            return friendsList.map((friend, index) => {
                friend.rating = friendsRating[friend.id] ? friendsRating[friend.id] : 0;
                return friend;
            });
        }
        return friendsList;
    }

    public getBookmark(friendsList: Friend[]): Friend[] {
        const friendsBookmark: object = this.LocalSave.get(this.nameFriendsBookmark);
        if (friendsBookmark) {
            return friendsList.map((friend, index) => {
                friend.bookmark = friendsBookmark[friend.id] ? friendsBookmark[friend.id] : 0;
                return friend;
            });
        }
        return friendsList;
    }

    // сохраняем локально пользователя в закладки
    public setBookmark(id: string, value: number): void {
        this.LocalSave.set(this.nameFriendsBookmark, {[id]: value});
    }

    // сохраняем рейтинг участника в закладки
    public setRating(id: string, value: number): void {
        this.LocalSave.set(this.nameFriendsRating, {[id]: value});
    }

    // делаем сортировку по рейтингу
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
        return friendsList.filter(friend => friend.bookmark);
    }

    public getFilterSearch(friendsList: Friend[], search: string): Friend[] {
        return friendsList.filter(friend => {
            return (
                friend.first_name.trim().toLowerCase().indexOf(search.trim().toLowerCase()) >= 0 ||
                friend.last_name.trim().toLowerCase().indexOf(search.trim().toLowerCase()) >= 0
            );
        });
    }

    public setLimitViewOnPage(friendsList: Friend[], startView: number, limitView: number): Friend[] {
        return friendsList.slice(startView, (startView + limitView));
    }
}
