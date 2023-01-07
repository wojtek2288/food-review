import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { ConfirmationDialogComponent } from 'src/app/main/confirmation-dialog/confirmation-dialog.component';
import { Review } from '../model/review.interface';

@Component({
  selector: 'app-review-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class ReviewSearchComponent extends BaseSearchComponent<Review> {
  @Input() restaurantId: string = "";
  @Input() dishId: string = "";
  @Input() userId: string = "";
  constructor(private apiService: ApiService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    super();
    this.dataSource = new MatTableDataSource<Review>();
    this.displayedColumns = ['id', 'username', 'restaurantName', 'dishName', 'description', 'rating', 'reviewButtons'];
    this.header = "Reviews";
  }

  override onSearch(): void {
    this.isLoadingSubject.next(true);
    this.apiService.getReviews({
      sortingField: this.sortingField,
      sortingDirection: this.sortingDirection,
      pageCount: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchPhrase: this.searchFormControl.value,
      restaurantId: this.restaurantId,
      dishId: this.dishId,
      userId: this.userId
    }, this.authService.loggedInUser?.access_token!).subscribe(x => 
    {
      this.isLoadingSubject.next(false);
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }

  override onDelete(rowData: Review): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(x => {
      if (x)
      {
        this.apiService.deleteReview({
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

  override onBan(rowData: Review): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(x => {
      if (x)
      {
        this.apiService.banUser({
          id: rowData.userId
        }, this.authService.loggedInUser?.access_token!).subscribe(
          _ => {
            this.snackBar.open("Successfuly banned user", "", {duration: 3000});
            this.onSearch();
          },
          x => this.snackBar.open("User with specified Id does not exist", "", {duration: 3000})
        );
      }
    });
   }
}
