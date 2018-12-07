import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent} from 'rxjs';
import {pairwise, map, exhaustMap, filter, debounceTime} from 'rxjs/operators';

// todo поддержка привязки к контейнеру, а не документу
// todo поддержка лоадера

@Directive({
    selector: '[appInfinityScrollLoader]',
})
export class InfinityScrollLoaderDirective implements AfterViewInit, AfterViewChecked {

    private scrollEvent$;
    private initScrollHeight = 0;

    @Input() scrollPercent = 90;
    // сообщение от контенейнера о том, что были добавленны новые данные
    @Input() issetContent = false;
    // событие скролла контейнеру о том, что надо довывести элементы
    @Output() scrollingActive: EventEmitter<boolean> = new EventEmitter();
    // событие контейнеру о том, что надо довывести элементы при инициализации
    @Output() initFilling: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private elm: ElementRef<HTMLLinkElement>,
        @Inject(DOCUMENT) private document: any
    ) {}

    ngAfterViewInit() {

        this.scrollEvent$ = fromEvent(window, 'scroll')
            .pipe (
                debounceTime(50),
                map((e: any) => this.document.documentElement.scrollTop || this.document.body.scrollTop),
                pairwise(),
                filter(positions => this.isScrollingDown(positions)), // отфильтровываем если скрол в обратную сторону
                filter(_ => this.isScrollingActive())
            );

        this.scrollEvent$.subscribe(() => {
            console.log('emit');
            this.issetContent = false;
            this.scrollingActive.emit(true);
        });

    }

    ngAfterViewChecked() {
        this.initFillingScroll();
    }

    // todo нужно продумать, когда элементов реально меньше чем высота экрана
    // делаем проверку, что текущий контент перекрывает текущий экран
    private initFillingScroll = () => {

        const initScrollHeight = this.elm.nativeElement.offsetHeight;
        if (
            this.issetContent && // когда пришли данные для полной отрисовки контейнера
            (initScrollHeight !== this.initScrollHeight) // проверяем, что высота изменилась
        ) {

            // высота документа без прокрутки
            const clientHeight = this.document.documentElement.clientHeight;
            // проинициализированная высота контейнера
            this.initScrollHeight = this.elm.nativeElement.offsetHeight;
            // высота скролл до верха от контейнера
            const scrollTop = this.elm.nativeElement.offsetTop;
            console.log('X clientHeight', (clientHeight));
            console.log('X scrollTop', (scrollTop + this.initScrollHeight));
            // когда высота экрана больше высоты компонента
            if (clientHeight >= (scrollTop + this.initScrollHeight)) {
                console.log('no fill');
                this.initFilling.emit(true);
            }
        }
    }

    // проверка, что скрол идёт не в обратном порядке
    private isScrollingDown = (positions) => {
        return positions[0] < positions[1];
    }

    // проверка, что величина прокрутки достигла точки подгрузки нового контента
    private isScrollingActive = () => {
        // полная высота документа с учётом прокрутки
        const scrollHeight = this.document.documentElement.scrollHeight;
        // высота прокрутки
        const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;

        if (this.scrollPercent) {
            console.log('scrollPercent', ((scrollTop + window.innerHeight) / scrollHeight));
            return ((scrollTop + window.innerHeight) / scrollHeight) >= (this.scrollPercent / 100);
        }
    }
}
