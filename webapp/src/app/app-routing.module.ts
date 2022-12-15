import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishSearchComponent } from './dishes/dish-search/dish-search.component';
import { LoggedInGuard } from './main/auth/logged-in.guard';
import { NotLoggedInGuard } from './main/auth/not-logged-in.guard';
import { LoginComponent } from './main/login/login.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { RestaurantSearchComponent } from './restaurants/restaurant-search/restaurant-search.component';
import { UserSearchComponent } from './users/user-search/user-search.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantSearchComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'dishes',
    component: DishSearchComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'users',
    component: UserSearchComponent,
    canActivate: [LoggedInGuard]
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
