import { AfterViewChecked, AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinct, filter, map, pairwise, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appInfinityScrollLoader]'
})
export class InfinityScrollLoaderDirective
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  private initScrollHeight = 0;
  private scrollEvent$;
  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() scrollPercent = 90;
  // message that data has been added
  @Input() contents: any[];
  // event that needs to be drawn content
  @Output() drawing: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private elm: ElementRef<HTMLLinkElement>,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit() {
    this.scrollEvent$ = fromEvent(window, 'scroll').pipe(
      map((e: any) => this.scrollTop),
      pairwise(),
      filter((positions) => this.isScrollingDown(positions)),
      debounceTime(200),
      distinct(),
      filter((_) => this.isScrollingActive()),
      takeUntil(this.unsubscribe$)
    );

    this.scrollEvent$.subscribe(() => {
      this.drawing.emit(true);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewChecked() {
    this.checkFilling();
  }

  private get scrollTop() {
    return Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  private checkFilling = () => {
    if (this.contents.length > 0) {
      const initScrollHeight = this.elm.nativeElement.offsetHeight;

      // check that the height has changed
      if (initScrollHeight !== this.initScrollHeight) {
        this.initScrollHeight = initScrollHeight;

        // document height without scrolling
        const clientHeight = this.document.documentElement.clientHeight;
        // height from container to top
        const scrollTop = this.elm.nativeElement.offsetTop;

        // when screen height is greater than component height
        if (clientHeight >= scrollTop + this.initScrollHeight) {
          this.drawing.emit(true);
        }
      }
    } else {
      this.initScrollHeight = 0;
    }
  };

  // check that the scrolling is not in the reverse order
  private isScrollingDown = (positions) => {
    return positions[0] < positions[1];
  };

  private isScrollingActive = () => {
    // full document height with scroll
    const scrollHeight = this.document.documentElement.scrollHeight;
    return (
      (this.scrollTop + window.innerHeight) / scrollHeight >=
      this.scrollPercent / 100
    );
  };
}
