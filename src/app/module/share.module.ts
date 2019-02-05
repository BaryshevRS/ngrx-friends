import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollLoaderDirective} from '../directive/infinity-scroll-loader.directive';
import {LoaderComponent} from '../component/loader/loader.component';
import {ErrorsComponent} from '../component/errors/errors.component';

@NgModule({
    declarations: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InfinityScrollLoaderDirective,
        LoaderComponent,
        ErrorsComponent
    ]
})
export class ShareModule {
}
