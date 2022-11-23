import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { MainModule } from '../main/main.module';

@NgModule({
  declarations: [
    RestaurantSearchComponent
  ],
  imports: [
    CommonModule,
    MainModule
  ],
  exports: [
    RestaurantSearchComponent,
  ]
})
export class RestaurantsModule { }
