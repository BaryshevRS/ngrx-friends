import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {

    @Input() id: string;
    @Input() value: number;
    @Output() bookmarkChange: EventEmitter<number> = new EventEmitter();

    public setValue(): void {
        this.bookmarkChange.emit(<number>(this.value ? 0 : 1));
    }

}
