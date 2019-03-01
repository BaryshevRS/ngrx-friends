import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollLoaderDirective} from '../directive/infinity-scroll-loader.directive';

@NgModule({
    declarations: [
        InfinityScrollLoaderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [InfinityScrollLoaderDirective]
})
export class ShareModule {
}
