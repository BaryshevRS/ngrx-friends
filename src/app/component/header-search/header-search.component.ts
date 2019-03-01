import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent implements OnInit, OnDestroy {

    private searchTerms = new Subject<string>();
    public search$;

    @Output() initSearch: EventEmitter<string> = new EventEmitter();

    @ViewChild('searchBox') searchBox: ElementRef;

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
        ).subscribe(term => this.initSearch.emit(term));
    }

    ngOnDestroy() {
        if (this.search$) {
            this.search$.unsubscribe();
        }
    }
}
