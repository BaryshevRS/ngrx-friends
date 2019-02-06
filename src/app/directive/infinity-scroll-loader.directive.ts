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

// todo поддержка привязки к контейнеру, а не документу

@Directive({
    selector: '[appInfinityScrollLoader]',
})
export class InfinityScrollLoaderDirective implements AfterViewInit, AfterViewChecked, OnDestroy {

    private initScrollHeight = 0;
    private scrollEvent$;

    @Input() scrollPercent = 90;
    // сообщение от контенейнера о том, что были добавленны новые данные
    @Input() contents: any[];
    // общее событие для скролла и заполнения
    @Output() drawing: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private elm: ElementRef<HTMLLinkElement>,
        @Inject(DOCUMENT) private document: any
    ) {}

    ngAfterViewInit() {

        this.scrollEvent$ = fromEvent(window, 'scroll')
            .pipe (
                // todo настроить задержку, первый раз не срабатывает
                map((e: any) => this.document.documentElement.scrollTop || this.document.body.scrollTop),
                pairwise(),
                filter(positions => this.isScrollingDown(positions)), // отфильтровываем если скрол в обратную сторону
                debounceTime(200),
                distinct(),
                filter(_ => this.isScrollingActive()),
            ).subscribe(() => {
                console.log('emit draw')
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

    // делаем проверку, что текущий контент перекрывает текущий экран
    private checkFilling = () => {

        // в контейнер добавлен контент
        if (this.contents.length > 0) {

            const initScrollHeight = this.elm.nativeElement.offsetHeight;

            if (initScrollHeight !== this.initScrollHeight) { // проверяем, что высота изменилась
                this.initScrollHeight = initScrollHeight;

                // высота документа без прокрутки
                const clientHeight = this.document.documentElement.clientHeight;
                // высота скролл до верха от контейнера
                const scrollTop = this.elm.nativeElement.offsetTop;

                // когда высота экрана больше высоты компонента
                if (clientHeight >= (scrollTop + this.initScrollHeight)) {
                    // console.log('no fill');
                    this.drawing.emit(true);
                }
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
            return ((scrollTop + window.innerHeight) / scrollHeight) >= (this.scrollPercent / 100);

        }
    }
}
