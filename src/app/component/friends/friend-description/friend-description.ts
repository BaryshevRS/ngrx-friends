import {Input, Component} from '@angular/core';
import {Friend} from '../../../class/friends/index';

@Component({
    selector: 'app-friend-description',
    templateUrl: './friend-description.html',
    styleUrls: ['./friend-description.scss']
})
export class FriendDescription {
    @Input() friend: Friend =  new Friend();
}
