import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FriendsAction} from '../../store/type';
import {ErrorMessage} from '../../class/errors';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    errors: ErrorMessage;

    constructor(private store$: Store<FriendsAction>) {
    }

    ngOnInit() {
        this.store$.pipe(select('friends')).subscribe(({errors}) => {
         //   console.log(this.errors);
            this.errors = errors || null;
        });

    }

}
