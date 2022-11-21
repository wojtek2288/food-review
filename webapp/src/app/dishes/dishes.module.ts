import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishSearchComponent } from './dish-search/dish-search.component';



@NgModule({
  declarations: [
    DishSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DishSearchComponent
  ]
})
export class DishesModule { }
