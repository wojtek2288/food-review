import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Dish } from '../model/dish.interface';

@Component({
  selector: 'app-dish-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class DishSearchComponent extends BaseSearchComponent<Dish> {
  @Input() restaurantId: string = "";
  constructor(private apiService: ApiService, private authService: AuthService) {
    super();
    this.dataSource = new MatTableDataSource<Dish>();
    this.displayedColumns = ['id', 'name', 'restaurantName', 'description', 'showDetails'];
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
}