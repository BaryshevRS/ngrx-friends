import {Component, OnInit} from '@angular/core';
import {SearchFriends} from '../../store/action';
import {Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public title = 'Friends';
    public mobileMenu: boolean;

    constructor(
        private store$: Store<FriendsAction>,
        private router: Router) {}

    initSearch(term: string) {
        console.log('termx', term);
        this.router.navigate(['/']);
        this.store$.dispatch(new SearchFriends(term));
    }

}
