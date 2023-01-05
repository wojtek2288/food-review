import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { MainModule } from '../main/main.module';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

@NgModule({
  declarations: [
    RestaurantSearchComponent,
    RestaurantDetailsComponent
  ],
  imports: [
    CommonModule,
    MainModule
  ],
  exports: [
    RestaurantSearchComponent,
    RestaurantDetailsComponent
  ]
})
export class RestaurantsModule { }
