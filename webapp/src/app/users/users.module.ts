import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search/user-search.component';



@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UserSearchComponent
  ]
})
export class UsersModule { }
