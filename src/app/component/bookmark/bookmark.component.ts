import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

    public active: number;

    @Input() id: string;
    @Input() value: number;
    @Output() bookmarkChange: EventEmitter<number> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public setValue(): void {
        this.bookmarkChange.emit(<number>(this.value ? 0 : 1));
    }

}
