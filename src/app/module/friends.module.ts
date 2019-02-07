import {NgModule} from '@angular/core';
import {BookmarkComponent} from '../component/bookmark/bookmark.component';
import {RatingComponent} from '../component/rating/rating.component';
import {CommonModule} from '@angular/common';
import {ShareModule} from './share.module';
import {FriendsListComponent} from '../component/friends/friends-list/friends-list.component';
import {FriendsComponent} from '../container/friends/friends.component';
import {FriendComponent} from '../component/friends/friend/friend.component';
import {FriendsRoutingModule} from '../routing/friends-routing.module';

@NgModule({
    declarations: [
        FriendsListComponent,
        FriendsComponent,
        FriendComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        FriendsRoutingModule
    ],
    exports: [FriendsComponent]
})
export class FriendsModule {
}
