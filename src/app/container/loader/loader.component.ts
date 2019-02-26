import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy, AfterViewInit {

  constructor(private store$: Store<FriendsAction>, private cd: ChangeDetectorRef){}

  public loading: false;
  public loading$;

  ngAfterViewInit(): void {
    this.loading$ = this.store$.pipe(select('friends')).subscribe((friend) => {

      console.log('friend', friend)

      const {loading, errors} = friend

      this.loading = loading;

      console.log('this.loading b', loading)

      if(errors) {
        this.loading = false;
      }

      console.log('this.loading', this.loading)

       this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if(this.loading$) {
      this.loading$.unsubscribe();
    }
  }

}
