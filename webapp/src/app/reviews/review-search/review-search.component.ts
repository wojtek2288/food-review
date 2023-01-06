import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Review } from '../model/review.interface';

@Component({
  selector: 'app-review-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class ReviewSearchComponent extends BaseSearchComponent<Review> {
  @Input() restaurantId: string = "";
  @Input() dishId: string = "";
  constructor(private apiService: ApiService, private authService: AuthService) {
    super();
    this.dataSource = new MatTableDataSource<Review>();
    this.displayedColumns = ['id', 'username', 'restaurantName', 'dishName', 'description', 'rating', 'showDetails'];
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
      dishId: this.dishId
    }, this.authService.loggedInUser?.access_token!).subscribe(x => 
    {
      this.isLoadingSubject.next(false);
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }
}
