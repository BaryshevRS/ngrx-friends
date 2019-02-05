import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Friend} from '../../../class/friends/index';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

//todo вынести состояние в контейнер

@Component({
    selector: 'app-friend-description',
    templateUrl: './friend-description.html',
    styleUrls: ['./friend-description.scss']
})
export class FriendDescription implements OnInit {

    @Input() friend: Friend =  new Friend();

    public id: string;

    constructor(
        private store$: Store<any>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }
}
