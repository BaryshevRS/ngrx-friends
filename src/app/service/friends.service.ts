import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, switchMap, reduce, filter} from 'rxjs/operators';

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
                private LocalSave: LocalSaveService ) {
    }

    getFriends({ typeSort = 0, searchValue = '', showBookmark = false, startView = 0, limitView = 0}: IGetFriends): Observable<Friend[]> {

/*        console.log('typeSort', typeSort );
        console.log('searchValue', searchValue );
        console.log('showBookmark', showBookmark );
        console.log('startView', startView );
        console.log('limitView', limitView );*/

        console.log('startView', startView );
        console.log('limitView', limitView );

        return this.http.get(this.BASE_URL + 'friends')
            .pipe(
                map((friendsList: Friend[]) => {

                    // console.log('friendsList', friendsList);

                    // преобразования

                    friendsList = this.getRating(friendsList);
                    friendsList = this.getBookmark(friendsList);

                    friendsList = this.setRatingSort(friendsList, typeSort);
                    // console.log('~friendsList', friendsList);

                    if (showBookmark) {
                        friendsList = this.getFilterBookmark(friendsList);
                    }

                    if (searchValue) {
                        friendsList = this.getFilterSearch(friendsList, searchValue);
                    }

                    friendsList = this.setLimitViewOnPage(friendsList, startView, limitView);

                   // console.log('friendsList', friendsList);
                    return friendsList;
                }),
                catchError(({status}: Response) => throwError(status))
            );

    }

    // получаем число закладок друзей
    public getCountBookmarskFriends(): Observable<number>  {
        return this.http.get(this.BASE_URL + 'friends')
            .pipe(
               map((friendsList: Friend[]) => {
                    friendsList = this.getBookmark(friendsList);
                    friendsList = this.getFilterBookmark(friendsList);
                    return friendsList.reduce((a: number, friend: Friend) =>  friend.bookmark > 0 ? ++a : a, 0);
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
        this.LocalSave.set(this.nameFriendsBookmark, {[id] : value});
    }

    // сохраняем рейтинг участника в закладки
    public setRating(id: string, value: number): void {
        this.LocalSave.set(this.nameFriendsRating, {[id] : value});
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

    // фильтруем по закладкам
    public getFilterBookmark(friendsList: Friend[]): Friend[] {
        return friendsList.filter(friend => friend.bookmark);
    }

    // фильтруем по поиску
    public getFilterSearch(friendsList: Friend[], search: string): Friend[] {
        return friendsList.filter(friend => {
            return (
                friend.first_name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
                friend.last_name.toLowerCase().indexOf(search.toLowerCase()) >= 0
            );
        });
    }

    // todo сделать подгрузку с сервера чанками

    public setLimitViewOnPage(friendsList: Friend[], startView: number, limitView: number): Friend[] {
        return friendsList.slice(0, (startView + limitView));
    }
}
