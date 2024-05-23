import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

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
      takeUntil(this.unsubscribe$)
    );

    this.search$.subscribe((term) => this.initSearch.emit(term));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
