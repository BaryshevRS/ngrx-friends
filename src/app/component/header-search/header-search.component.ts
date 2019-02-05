import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';

// todo добавить обработку enter и переход на главную страницу для результатов поиска
@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

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
        this.searchBox.nativeElement.value = '';
        this.searchBox.nativeElement.dispatchEvent(new Event('input'));
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
}
