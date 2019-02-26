import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {fadeStateTrigger} from '../../fade.animation';
import {Friend} from '../../class/friends';

// todo changeDetection: ChangeDetectionStrategy.OnPush

@Component({
    selector: 'app-friends-list',
    templateUrl: './friends-list.component.html',
    styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent {

    @Input('contents') friends: Friend[];

    trackByFn(index: number, item: Friend) {
        return item.id;
    }

}
