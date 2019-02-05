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
import {pairwise, map,  filter, debounceTime} from 'rxjs/operators';

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
    @Input() contents: any[];
    // общее событие для скролла и заполнения
    @Output() drawing: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private elm: ElementRef<HTMLLinkElement>,
        @Inject(DOCUMENT) private document: any
    ) {}

    // ngAfterContentInit(){

    ngAfterViewInit() {

        this.scrollEvent$ = fromEvent(window, 'scroll')
            .pipe (
                // todo настроить задержку, первый раз не срабатывает
                debounceTime(50),
                map((e: any) => this.document.documentElement.scrollTop || this.document.body.scrollTop),
                pairwise(),
                filter(positions => this.isScrollingDown(positions)), // отфильтровываем если скрол в обратную сторону
                filter(_ => this.isScrollingActive()),
            ).subscribe(() => {
                this.drawing.emit(true);
            });
    }

    ngAfterViewChecked() {
        this.checkFilling();
    }

    // делаем проверку, что текущий контент перекрывает текущий экран
    private checkFilling = () => {

        // в контейнер добавлен контент
        if (this.contents.length > 0) {

            const initScrollHeight = this.elm.nativeElement.offsetHeight;

               // console.log('this.elm.nativeElement.offsetHeight', this.elm.nativeElement.offsetHeight)
               // console.log('this.elm.nativeElement.scrollHeight', this.elm.nativeElement.scrollHeight)
               // console.log('this.elm.nativeElement.clientHeight', this.elm.nativeElement.clientHeight)

            if (initScrollHeight !== this.initScrollHeight) { // проверяем, что высота изменилась
                this.initScrollHeight = initScrollHeight;

                // высота документа без прокрутки
                const clientHeight = this.document.documentElement.clientHeight;
                // высота скролл до верха от контейнера
                const scrollTop = this.elm.nativeElement.offsetTop;

                 // console.log('clientHeight > initScrollHeight', (clientHeight) +' > '+ (scrollTop + this.initScrollHeight));

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
            // console.log('scrollPercent', ((scrollTop + window.innerHeight) / scrollHeight));
            return ((scrollTop + window.innerHeight) / scrollHeight) >= (this.scrollPercent / 100);
        }
    }
}
