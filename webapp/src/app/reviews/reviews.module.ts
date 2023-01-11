import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModule } from '../main/main.module';
import { ReviewSearchComponent } from './review-search/review-search.component';



@NgModule({
    declarations: [
        ReviewSearchComponent
    ],
    imports: [
        CommonModule,
        MainModule
    ],
    exports: [
        ReviewSearchComponent
    ]
})
export class ReviewsModule { }
