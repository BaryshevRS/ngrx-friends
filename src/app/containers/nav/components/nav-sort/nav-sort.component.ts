import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-nav-sort',
  templateUrl: './nav-sort.component.html',
  styleUrls: ['./nav-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSortComponent {
  @Output() changeSort: EventEmitter<number> = new EventEmitter();
  @Input() typeSort = 0;

  setSort(sortType?: number): void {
    this.typeSort = sortType;
    this.changeSort.emit(<number>sortType);
  }
}
