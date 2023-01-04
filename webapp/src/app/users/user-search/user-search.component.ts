import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-user-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class UserSearchComponent extends BaseSearchComponent<User> implements OnInit {
  constructor(private apiService: ApiService, private authService: AuthService) {
    super();
    this.dataSource = new MatTableDataSource<User>();
    this.displayedColumns = ['id', 'name', 'description', 'showDetails'];
  }

  ngOnInit(): void {
    this.header = "Users";
  }

  override onSearch(): void {
    this.apiService.getUsers({
      sortingField: this.sortingField,
      sortingDirection: this.sortingDirection,
      pageCount: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchPhrase: this.searchFormControl.value,
    }, this.authService.loggedInUser?.access_token!).subscribe(x => 
    {
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }
}
