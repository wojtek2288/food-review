import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RestaurantDetails } from 'src/app/api/model/restaurant-details';
import { RestaurantApiService } from 'src/app/api/restaurant-api.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  isLoading$ = this.restaurantService.isLoading$;
  restaurantId: string = "";
  restaurant: RestaurantDetails = {
    id: this.restaurantId,
    name: "",
    description: "",
    imageUrl: "",
    isVisible: false
  };

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.restaurantId = x['id'];
        this.getDetails();
      });
    this.restaurantService.restaurantDetails$.subscribe(x => this.restaurant = x);
    this.restaurantService.afterCommandFinished$.subscribe(x => this.getDetails());
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
    
  }

  onDelete(): void {
    this.restaurantService.deleteRestaurant(this.restaurantId);
  }
}
