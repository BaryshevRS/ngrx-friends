import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-nav-sort',
    templateUrl: './nav-sort.component.html',
    styleUrls: ['./nav-sort.component.scss']
})
export class NavSortComponent implements OnInit {

    constructor() {}

    @Output() changeSort: EventEmitter<number> = new EventEmitter();
    @Input() typeSort = 0;

    // выбираем тип сортировки и эмитируем событие в родительский компонент
    setSort(sortType?: number): void {
        this.changeSort.emit(<number>sortType);
    }

    ngOnInit() {
    }

}
