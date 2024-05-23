import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectIsFriends } from '../../../store/selector/router.selector';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../store/reducer';

@Directive({
  selector: '[appIsFriendsList]'
})
export class IsFriendsListDirective implements OnInit, OnDestroy {
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private store$: Store<AppState>,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  public isFriends$: Observable<boolean> = this.store$.pipe(
    select(selectIsFriends)
  );

  ngOnInit(): void {
    this.isFriends$.pipe(takeUntil(this.unsubscribe$)).subscribe((isList) => {
      if (isList) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
