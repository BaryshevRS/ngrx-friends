import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent} from 'rxjs';
import {pairwise, map, filter, debounceTime, distinct} from 'rxjs/operators';

@Directive({
    selector: '[appInfinityScrollLoader]',
})
export class InfinityScrollLoaderDirective implements AfterViewInit, AfterViewChecked, OnDestroy {

    private initScrollHeight = 0;
    private scrollEvent$;

    @Input() scrollPercent = 90;
    // message that data has been added
    @Input() contents: any[];
    // event that needs to be drawn content
    @Output() drawing: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private elm: ElementRef<HTMLLinkElement>,
        @Inject(DOCUMENT) private document: any
    ) {}

    ngAfterViewInit() {

        this.scrollEvent$ = fromEvent(window, 'scroll')
            .pipe (
                map((e: any) => this.document.documentElement.scrollTop || this.document.body.scrollTop),
                pairwise(),
                filter(positions => this.isScrollingDown(positions)), // отфильтровываем если скрол в обратную сторону
                debounceTime(200),
                distinct(),
                filter(_ => this.isScrollingActive()),
            ).subscribe(() => {
                this.drawing.emit(true);
            });
    }

    ngOnDestroy() {
        if(this.scrollEvent$) {
           this.scrollEvent$.unsubscribe();
        }
    }

    ngAfterViewChecked() {
        this.checkFilling();
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
                if (clientHeight >= (scrollTop + this.initScrollHeight)) {
                    this.drawing.emit(true);
                }
            }
        } else {
            this.initScrollHeight = 0;
        }
    }

    // check that the scrolling is not in the reverse order
    private isScrollingDown = (positions) => {
        return positions[0] < positions[1];
    }

    private isScrollingActive = () => {
        // full document height with scroll
        const scrollHeight = this.document.documentElement.scrollHeight;
        // scroll height
        const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;

        if (this.scrollPercent) {
            return ((scrollTop + window.innerHeight) / scrollHeight) >= (this.scrollPercent / 100);

        }
    }
}
