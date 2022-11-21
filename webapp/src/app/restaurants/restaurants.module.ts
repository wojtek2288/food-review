import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    RestaurantSearchComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    RestaurantSearchComponent,
  ]
})
export class RestaurantsModule { }
