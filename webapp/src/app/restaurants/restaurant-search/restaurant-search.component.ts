import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent extends BaseSearchComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.header = "Restaurant";
  }
}
