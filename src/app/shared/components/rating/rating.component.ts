import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  @Input() id: string;
  @Input() value: number;
  @Input() ratingSize: number;

  private defaultRatingSize = 5;
  public ratingSizeView: number[];

  public setValue(rating: number): void {
    this.value = rating;
    this.ratingChange.emit(rating);
  }

  private setRatingSize() {
    const ratingSize = this.ratingSize || this.defaultRatingSize;
    const ratingSizeView: number[] = [];

    for (let i = 1; i <= ratingSize; i++) {
      ratingSizeView.push(i);
    }

    this.ratingSizeView = ratingSizeView;
  }

  ngOnInit(): void {
    this.setRatingSize();
  }
}
