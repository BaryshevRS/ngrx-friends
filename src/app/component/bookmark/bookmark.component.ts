import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {
  @Input() bookmark: boolean;
  @Output() bookmarkChange: EventEmitter<boolean> = new EventEmitter();

  public setValue(): void {
    this.bookmarkChange.emit(!this.bookmark);
  }
}
