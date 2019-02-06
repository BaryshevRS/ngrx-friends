import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollLoaderDirective} from '../directive/infinity-scroll-loader.directive';
import {LoaderComponent} from '../container/loader/loader.component';
import {ErrorsComponent} from '../container/errors/errors.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent
    ]
})
export class ShareModule {
}
