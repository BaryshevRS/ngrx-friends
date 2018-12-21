import {NgModule} from '@angular/core';
import {BookmarkComponent} from '../component/bookmark/bookmark.component';
import {RatingComponent} from '../component/rating/rating.component';
import {CommonModule} from '@angular/common';
import {ShareModule} from './share.module';
import {FriendsListComponent} from '../component/friends/friends-list/friends-list.component';
import {FriendsComponent} from '../container/friends/friends.component';
import {FriendComponent} from '../component/friends/friend/friend.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        FriendsListComponent,
        FriendsComponent,
        FriendComponent,
        RatingComponent,
        BookmarkComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        RouterModule
    ],
    exports: [FriendsComponent]
})
export class FriendsModule {
}
