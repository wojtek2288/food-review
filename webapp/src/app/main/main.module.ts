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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    NavbarComponent,
    BaseSearchComponent
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
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    BaseSearchComponent
  ]
})
export class MainModule { }
