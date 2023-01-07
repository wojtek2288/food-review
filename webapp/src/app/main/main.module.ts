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
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoggedInGuard } from './auth/logged-in.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotLoggedInGuard } from './auth/not-logged-in.guard';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    NavbarComponent,
    BaseSearchComponent,
    LoginComponent,
    NotFoundComponent,
    ConfirmationDialogComponent
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule,
    MatDialogModule
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTabsModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [
    LoggedInGuard,
    NotLoggedInGuard
  ]
})
export class MainModule { }
