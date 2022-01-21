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
  @Input() bookmark: number;
  @Output() bookmarkChange: EventEmitter<number> = new EventEmitter();

  public setValue(): void {
    const bookmark = this.bookmark ? 0 : 1
    this.bookmarkChange.emit(bookmark);
    // Optimistic ui
    this.bookmark = bookmark;
  }
}
