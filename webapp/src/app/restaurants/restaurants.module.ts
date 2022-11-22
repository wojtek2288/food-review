import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
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
