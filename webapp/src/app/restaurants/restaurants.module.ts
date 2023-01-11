import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { MainModule } from '../main/main.module';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { DishesModule } from '../dishes/dishes.module';
import { ReviewsModule } from '../reviews/reviews.module';

@NgModule({
    declarations: [
        RestaurantSearchComponent,
        RestaurantDetailsComponent
    ],
    imports: [
        CommonModule,
        MainModule,
        DishesModule,
        ReviewsModule
    ],
    exports: [
        RestaurantSearchComponent,
        RestaurantDetailsComponent
    ]
})
export class RestaurantsModule { }
