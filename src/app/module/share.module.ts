import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollLoaderDirective} from '../directive/infinity-scroll-loader.directive';
import {LoaderComponent} from '../container/loader/loader.component';
import {ErrorsComponent} from '../container/errors/errors.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RatingComponent} from '../component/rating/rating.component';
import {BookmarkComponent} from '../component/bookmark/bookmark.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent,
        RatingComponent,
        BookmarkComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent,
        RatingComponent,
        BookmarkComponent
    ]
})
export class ShareModule {
}
