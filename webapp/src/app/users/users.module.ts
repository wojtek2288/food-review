import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search/user-search.component';
import { MainModule } from '../main/main.module';



@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    MainModule
  ],
  exports: [
    UserSearchComponent
  ]
})
export class UsersModule { }
