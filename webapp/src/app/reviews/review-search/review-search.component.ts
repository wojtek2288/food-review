import { Component } from '@angular/core';
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
  constructor(private apiService: ApiService, private authService: AuthService) {
    super();
    this.dataSource = new MatTableDataSource<Review>();
    this.displayedColumns = ['id', 'name','description', 'showDetails'];
    this.header = "Restaurants";
  }

  ngOnInit(): void {
  }

}
