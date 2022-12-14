import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishSearchComponent } from './dish-search/dish-search.component';
import { MainModule } from '../main/main.module';



@NgModule({
  declarations: [
    DishSearchComponent
  ],
  imports: [
    CommonModule,
    MainModule
  ],
  exports: [
    DishSearchComponent
  ]
})
export class DishesModule { }
