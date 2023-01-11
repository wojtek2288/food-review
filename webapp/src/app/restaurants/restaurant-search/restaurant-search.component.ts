import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RestaurantApiService } from 'src/app/api/restaurant-api.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Restaurant } from '../model/restaurant.interface';

@Component({
    selector: 'app-restaurant-search',
    templateUrl: '../../main/base-search/base-search.component.html',
    styleUrls: ['../../main/base-search/base-search.component.css']
})
export class RestaurantSearchComponent extends BaseSearchComponent<Restaurant> implements OnDestroy {
    private unsubscribe$ = new Subject();

    constructor(
        private restaurantService: RestaurantApiService,
        private router: Router) {
        super();
        this.enableAdding = true;
        this.dataSource = new MatTableDataSource<Restaurant>();
        this.displayedColumns = ['id', 'name', 'description', 'restaurantButtons'];
        this.header = "Restaurants";
        this.isLoading$ = this.restaurantService.isLoading$;
        this.restaurantService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.onSearch()
        });
        this.restaurantService.restaurants$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.dataSource.data = x.items;
            this.paginator.length = x.totalCount;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

    override onSearch(): void {
        this.restaurantService.getRestaurants({
            sortingField: this.sortingField,
            sortingDirection: this.sortingDirection,
            pageCount: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            searchPhrase: this.searchFormControl.value,
        });
    }

    override onShowDetails(rowData: Restaurant): void {
        this.router.navigate(['restaurants', 'details', rowData.id]);
    }

    override onToggleVisibility(rowData: Restaurant): void {
        this.restaurantService.toggleRestaurantVisibility(rowData.id);
    }

    override onAdd(): void {
        this.restaurantService.addRestaurant();
    }

    override onEdit(rowData: Restaurant): void {
        this.restaurantService.editRestaurant(rowData);
    }

    override onDelete(rowData: Restaurant): void {
        this.restaurantService.deleteRestaurant(rowData.id);
    }
}
