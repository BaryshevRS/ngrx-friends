import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent implements OnInit, OnDestroy {

    private searchTerms = new Subject<string>();
    public search$: Observable<string>;
    private unsubscribe$: Subject<void> = new Subject<void>();

    @Output() initSearch: EventEmitter<string> = new EventEmitter();

    @ViewChild('searchBox') searchBox: ElementRef;

    search(term: string): void {
        // console.log('search', term);
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
            takeUntil(this.unsubscribe$)
        );

        this.search$.subscribe(term => this.initSearch.emit(term));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
