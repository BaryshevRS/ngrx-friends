import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';
import {Subscribable} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy, AfterViewInit {

  constructor(private store$: Store<FriendsAction>, private cd: ChangeDetectorRef){}

  public loading: boolean = false;
  public loading$;

  ngAfterViewInit(): void {

    this.loading$ = this.store$.pipe(select('friends')).subscribe(({loading, errors}) => {

      this.loading = loading;

        if(errors && !(Object.keys(errors).length === 0 && errors.constructor === Object)) {
          this.loading = false;
        }

       this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if(this.loading$) {
      this.loading$.unsubscribe();
    }
  }

}
