import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search/user-search.component';
import { MainModule } from '../main/main.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReviewsModule } from '../reviews/reviews.module';



@NgModule({
    declarations: [
        UserSearchComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        MainModule,
        ReviewsModule
    ],
    exports: [
        UserSearchComponent,
        UserDetailsComponent
    ]
})
export class UsersModule { }
