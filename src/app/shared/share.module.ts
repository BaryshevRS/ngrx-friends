import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfinityScrollLoaderDirective } from './directives/infinity-scroll-loader/infinity-scroll-loader.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RatingComponent } from './components/rating/rating.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InfinityScrollLoaderDirective,
    SpinnerComponent,
    ErrorsComponent,
    RatingComponent,
    BookmarkComponent,
    BreadcrumbComponent
  ],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [
    InfinityScrollLoaderDirective,
    SpinnerComponent,
    ErrorsComponent,
    RatingComponent,
    BookmarkComponent,
    BreadcrumbComponent,
    RouterModule
  ]
})
export class ShareModule {}
