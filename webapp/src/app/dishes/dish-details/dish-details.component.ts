import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DishApiService } from 'src/app/api/dish-api.service';
import { DishDetails } from 'src/app/api/model/dish-details';

@Component({
    selector: 'app-dish-details',
    templateUrl: './dish-details.component.html',
    styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
    isLoading$ = this.dishService.isLoading$;
    private unsubscribe$ = new Subject();

    dishId: string = "";
    dish: DishDetails = {
        id: this.dishId,
        name: "",
        description: "",
        imageUrl: "",
        restaurantId: "",
        restaurantName: "",
        price: 0,
        tags: []
    };

    constructor(
        private dishService: DishApiService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.dishId = x['id'];
            this.getDetails();
        });
        this.dishService.dishDetails$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.dish = x);
        this.dishService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.getDetails());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

    getDetails(): void {
        this.dishService.getDishDetails(this.dishId);
    }

    onEdit(): void {
        this.dishService.editDish(this.dish);
    }

    onDelete(): void {
        this.dishService.deleteDish(this.dishId);
    }
}
