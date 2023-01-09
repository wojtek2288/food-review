import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { DishSearchComponent } from './dishes/dish-search/dish-search.component';
import { LoggedInGuard } from './main/auth/logged-in.guard';
import { NotLoggedInGuard } from './main/auth/not-logged-in.guard';
import { LoginComponent } from './main/login/login.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantSearchComponent } from './restaurants/restaurant-search/restaurant-search.component';
import { ReviewSearchComponent } from './reviews/review-search/review-search.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserSearchComponent } from './users/user-search/user-search.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantSearchComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'restaurants' }
  },
  {
    path: 'restaurants/details/:id',
    component: RestaurantDetailsComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'restaurantDetails' }
  },
  {
    path: 'dishes',
    component: DishSearchComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'dishes' }
  },
  {
    path: 'dishes/details/:id',
    component: DishDetailsComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'dishDetails' }
  },
  {
    path: 'users',
    component: UserSearchComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'users' }
  },
  {
    path: 'users/details/:id',
    component: UserDetailsComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'userDetails' }
  },
  {
    path: 'reviews',
    component: ReviewSearchComponent,
    canActivate: [LoggedInGuard],
    data: { animationState: 'reviews' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'restaurants'
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
