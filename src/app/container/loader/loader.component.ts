import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {

  constructor(private store$: Store<FriendsAction>, private cd: ChangeDetectorRef){}

  public loading: false;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.store$.pipe(select('friends')).subscribe(({loading}) => {
      console.log('load', this.loading);
      this.loading = loading || false;

      this.cd.detectChanges();

      // setTimeout(() => this.loading = loading, 0)

    });

  }

}
