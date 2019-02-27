import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollLoaderDirective} from '../directive/infinity-scroll-loader.directive';
import {TranslateModule} from '@ngx-translate/core';
import {RatingComponent} from '../component/rating/rating.component';
import {BookmarkComponent} from '../component/bookmark/bookmark.component';
import {LoaderComponent} from '../container/loader/loader.component';
import {ErrorsComponent} from '../container/errors/errors.component';
import {BreadcrumbComponent} from '../component/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent,
        RatingComponent,
        BookmarkComponent,
        BreadcrumbComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    exports: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent,
        RatingComponent,
        BookmarkComponent,
        BreadcrumbComponent,
        RouterModule
    ]
})
export class ShareModule {
}
