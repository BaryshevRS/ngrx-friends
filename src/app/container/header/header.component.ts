import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public title = 'Friends';
    public mobileMenu: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    showMobileMenu(): void {
        this.mobileMenu = !this.mobileMenu;
    }

    initSearch(term: string) {
        console.log('termx!!', term);
    }

}
