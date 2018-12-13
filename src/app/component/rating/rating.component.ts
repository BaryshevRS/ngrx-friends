import {Input, Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

    public ratingValue: number[] = [1, 2, 3, 4, 5];

    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    @Input() id: string;
    @Input() value: number;

    public setValue(rating: number): void {
        this.value = rating;
        this.ratingChange.emit(rating);
    }

}
