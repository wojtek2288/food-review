import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { ConfirmationDialogComponent } from 'src/app/main/confirmation-dialog/confirmation-dialog.component';
import { Restaurant } from '../model/restaurant.interface';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class RestaurantSearchComponent extends BaseSearchComponent<Restaurant> {
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    super();
    this.dataSource = new MatTableDataSource<Restaurant>();
    this.displayedColumns = ['id', 'name','description', 'restaurantButtons'];
    this.header = "Restaurants";
  }

  override onSearch(): void {
    this.isLoadingSubject.next(true);
    this.apiService.getRestaurants({
      sortingField: this.sortingField,
      sortingDirection: this.sortingDirection,
      pageCount: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchPhrase: this.searchFormControl.value,
    }, this.authService.loggedInUser?.access_token!).subscribe(x => 
    {
      this.isLoadingSubject.next(false);
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }

  override onShowDetails(rowData: Restaurant): void {
   this.router.navigate(['restaurants', 'details', rowData.id]);
  }

  override onToggleVisibility(rowData: Restaurant): void {
      this.apiService.toggleRestaurantVisibility({
        id: rowData.id
      }, this.authService.loggedInUser?.access_token!).subscribe(
        _ => {
          this.snackBar.open("Successfuly changed visibility", "", {duration: 3000});
          this.onSearch();
        },
        x => this.snackBar.open("Restaurant with specified Id does not exist", "", {duration: 3000})
      );
  }

  override onDelete(rowData: Restaurant): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(x => {
      if (x)
      {
        this.apiService.deleteRestaurant({
          id: rowData.id
        }, this.authService.loggedInUser?.access_token!).subscribe(
          _ => {
            this.snackBar.open("Successfuly deleted restaurant", "", {duration: 3000});
            this.onSearch();
          },
          x => this.snackBar.open("Restaurant with specified Id does not exist", "", {duration: 3000})
        );
      }
    });
  }
}
