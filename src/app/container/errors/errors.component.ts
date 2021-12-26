import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FriendsAction } from '../../store/type';
import { ErrorMessage } from '../../class/errors';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getErrors } from 'src/app/store/selector/friends.selector';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  errors: ErrorMessage | null;
  errors$: Observable<ErrorMessage>;

  constructor(private store$: Store<FriendsAction>) {}

  ngOnInit() {
    this.errors$ = this.store$.pipe(
      select(getErrors),
      takeUntil(this.unsubscribe$)
    );

    this.errors$.subscribe((errors) => {
      this.errors = errors || null;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
