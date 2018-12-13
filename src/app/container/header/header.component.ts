import {Component, OnInit} from '@angular/core';
import {SearchFriends} from '../../store/action';
import {Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public title = 'Friends';
    public mobileMenu: boolean;

    constructor(private store$: Store<FriendsAction>) {
    }

    ngOnInit() {
    }

    showMobileMenu(): void {
        this.mobileMenu = !this.mobileMenu;
    }

    initSearch(term: string) {
        console.log('termx!!', term);
        this.store$.dispatch(new SearchFriends(term));
    }

}
