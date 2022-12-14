import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishSearchComponent } from './dishes/dish-search/dish-search.component';
import { RestaurantSearchComponent } from './restaurants/restaurant-search/restaurant-search.component';
import { UserSearchComponent } from './users/user-search/user-search.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantSearchComponent,
  },
  {
    path: 'dishes',
    component: DishSearchComponent
  },
  {
    path: 'users',
    component: UserSearchComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'restaurants'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
