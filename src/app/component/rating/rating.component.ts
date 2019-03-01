import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    public ratingValue: number[] = [1, 2, 3, 4, 5];
    protected ratingActive: number;

    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    @Input() id: string;
    @Input() value: number;

    constructor() {
    }

    ngOnInit() {
    }

    public setValue(rating: number): void {
        this.value = rating;
        this.ratingChange.emit(rating);
    }

}
