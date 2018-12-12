import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {map, debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit, AfterViewInit {


    public searchBox: ElementRef<HTMLLinkElement>;
    private searchTerms = new Subject<string>();
    public search$;

    constructor() {}

    search(term: string): void {
        this.searchTerms.next(term);
    }

    resetSearch() {
        console.log('resetSearch');
        this.searchTerms.next('');
    }

    ngOnInit() {
        this.search$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                console.log('termx', term);
                return of();
            }),
        );

        this.search$.subscribe();
    }

    ngAfterViewInit(): void {

    }
}
