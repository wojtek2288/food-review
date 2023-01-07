import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { ConfirmationDialogComponent } from 'src/app/main/confirmation-dialog/confirmation-dialog.component';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-user-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class UserSearchComponent extends BaseSearchComponent<User> {
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    super();
    this.dataSource = new MatTableDataSource<User>();
    this.displayedColumns = ['id', 'name', 'description', 'userButtons'];
    this.header = "Users";
  }

  override onSearch(): void {
    this.isLoadingSubject.next(true);
    this.apiService.getUsers({
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

  override onShowDetails(rowData: User): void {
    this.router.navigate(['users', 'details', rowData.id]);
   }

   override onBan(rowData: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(x => {
      if (x)
      {

      }
    });
   }
}
