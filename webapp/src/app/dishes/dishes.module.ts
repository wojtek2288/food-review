import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishSearchComponent } from './dish-search/dish-search.component';
import { MainModule } from '../main/main.module';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { ReviewsModule } from '../reviews/reviews.module';



@NgModule({
    declarations: [
        DishSearchComponent,
        DishDetailsComponent
    ],
    imports: [
        CommonModule,
        MainModule,
        ReviewsModule
    ],
    exports: [
        DishSearchComponent
    ]
})
export class DishesModule { }
