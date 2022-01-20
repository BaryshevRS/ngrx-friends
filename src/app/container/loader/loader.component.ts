import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FriendsState } from '../../interface/friends';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy, AfterViewInit {
  constructor(
    private store$: Store<FriendsState>,
    private cd: ChangeDetectorRef
  ) {}

  public loading = false;
  public loading$;

  ngAfterViewInit(): void {
    this.loading$ = this.store$
      .subscribe(({ loading, errors }) => {
        this.loading = loading;

        if (
          errors &&
          !(Object.keys(errors).length === 0 && errors.constructor === Object)
        ) {
          this.loading = false;
        }

        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.loading$) {
      this.loading$.unsubscribe();
    }
  }
}
