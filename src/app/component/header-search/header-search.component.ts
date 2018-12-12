import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {map, debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit, AfterViewInit {

   // public searchBox: ElementRef<HTMLLinkElement>;
    private searchTerms = new Subject<string>();
    public search$;

    @Output() initSearch: EventEmitter<string> = new EventEmitter();

    @ViewChild('searchBox') searchBox: ElementRef;

    constructor() {}

    search(term: string): void {
        this.searchTerms.next(term);
    }

    resetSearch() {
        console.log('resetSearch');
        this.searchBox.nativeElement.value = '';
        // this.searchBox = '';
    }

    ngOnInit() {
        this.search$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                return of(term);
            }),
        );

        this.search$.subscribe(term => this.initSearch.emit(term));
    }

    ngAfterViewInit(): void {

    }
}
