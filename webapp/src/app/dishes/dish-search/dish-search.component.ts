import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DishApiService } from 'src/app/api/dish-api.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Dish } from '../model/dish.interface';

@Component({
  selector: 'app-dish-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class DishSearchComponent extends BaseSearchComponent<Dish> {
  @Input() restaurantId: string = "";
  constructor(private dishService: DishApiService, private router: Router) {
    super();
    this.dataSource = new MatTableDataSource<Dish>();
    this.displayedColumns = ['id', 'name', 'restaurantName', 'description', 'dishButtons'];
    this.header = "Dishes";
    this.isLoading$ = this.dishService.isLoading$;
    this.dishService.afterCommandFinished$.subscribe(() => {
      this.onSearch()
    });
    this.dishService.dishes$.subscribe(x => {
      this.dataSource.data = x.items;
      this.paginator.length = x.totalCount;
    });
  }

  override onSearch(): void {
    this.dishService.getDishes({
      sortingField: this.sortingField,
      sortingDirection: this.sortingDirection,
      pageCount: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchPhrase: this.searchFormControl.value,
      restaurantId: this.restaurantId
    });
  }

  override onShowDetails(rowData: Dish): void {
    this.router.navigate(['dishes', 'details', rowData.id]);
  }

  override onDelete(rowData: Dish): void {
    this.dishService.deleteDish(rowData.id);
  }
}