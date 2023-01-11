import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RestaurantDetails } from 'src/app/api/model/restaurant-details';
import { Tag } from 'src/app/api/model/tag';
import { RestaurantApiService } from 'src/app/api/restaurant-api.service';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.component.html',
    styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
    isLoading$ = this.restaurantService.isLoading$;
    private unsubscribe$ = new Subject();

    restaurantId: string = "";
    restaurant: RestaurantDetails = {
        id: this.restaurantId,
        name: "",
        description: "",
        imageUrl: "",
        isVisible: false,
        tags: []
    };

    constructor(
        private route: ActivatedRoute,
        private restaurantService: RestaurantApiService) { }

    ngOnInit(): void {
        this.route.params.subscribe(x => {
            this.restaurantId = x['id'];
            this.getDetails();
        });
        this.restaurantService.restaurantDetails$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.restaurant = x);
        this.restaurantService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.getDetails());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

    getDetails(): void {
        this.restaurantService.getRestaurantDetails(this.restaurantId);
    }

    get visibility(): string {
        return this.restaurant.isVisible ? "Visible" : "Hidden";
    }

    onToggleVisibility(): void {
        this.restaurantService.toggleRestaurantVisibility(this.restaurantId);
    }

    onEdit(): void {
        this.restaurantService.editRestaurant(this.restaurant);
    }

    onDelete(): void {
        this.restaurantService.deleteRestaurant(this.restaurantId);
    }
}
