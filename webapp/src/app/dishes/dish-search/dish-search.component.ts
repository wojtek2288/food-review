import { Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    constructor(
        private dishService: DishApiService,
        private router: Router) {
        super();
        this.dataSource = new MatTableDataSource<Dish>();
        this.displayedColumns = ['id', 'name', 'restaurantName', 'description', 'dishButtons'];
        this.header = "Dishes";
        this.isLoading$ = this.dishService.isLoading$;
        this.dishService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.onSearch()
        });
        this.dishService.dishes$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
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

    override onAdd(): void {
        this.dishService.addDish(this.restaurantId);
    }

    override onEdit(rowData: Dish): void {
        this.dishService.editDish(rowData);
    }

    override onDelete(rowData: Dish): void {
        this.dishService.deleteDish(rowData.id);
    }
}