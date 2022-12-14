import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button"
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { BaseSearchComponent } from './base-search/base-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggedInGuard } from './auth/logged-in.guard';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    NavbarComponent,
    BaseSearchComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  exports: [
    NavbarComponent,
    BaseSearchComponent,
    LoginComponent,
    NotFoundComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    LoggedInGuard
  ]
})
export class MainModule { }
