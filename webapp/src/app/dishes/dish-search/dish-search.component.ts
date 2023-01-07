import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { ConfirmationDialogComponent } from 'src/app/main/confirmation-dialog/confirmation-dialog.component';
import { Dish } from '../model/dish.interface';

@Component({
  selector: 'app-dish-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class DishSearchComponent extends BaseSearchComponent<Dish> {
  @Input() restaurantId: string = "";
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    super();
    this.dataSource = new MatTableDataSource<Dish>();
    this.displayedColumns = ['id', 'name', 'restaurantName', 'description', 'dishButtons'];
    this.header = "Dishes";
  }

  override onSearch(): void {
    this.isLoadingSubject.next(true);
    this.apiService.getDishes({
      sortingField: this.sortingField,
      sortingDirection: this.sortingDirection,
      pageCount: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchPhrase: this.searchFormControl.value,
      restaurantId: this.restaurantId
    }, this.authService.loggedInUser?.access_token!).subscribe(x => 
    {
      this.isLoadingSubject.next(false);
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }

  override onShowDetails(rowData: Dish): void {
    this.router.navigate(['dishes', 'details', rowData.id]);
  }

  override onDelete(rowData: Dish): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(x => {
      if (x)
      {
        this.apiService.deleteDish({
          id: rowData.id
        }, this.authService.loggedInUser?.access_token!).subscribe(
          _ => {
            this.snackBar.open("Successfuly deleted review", "", {duration: 3000});
            this.onSearch();
          },
          x => this.snackBar.open("Review with specified Id does not exist", "", {duration: 3000})
        );
      }
    });
  }
}