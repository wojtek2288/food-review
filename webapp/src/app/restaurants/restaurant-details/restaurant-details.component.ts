import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { RestaurantDetails } from 'src/app/api/model/restaurant-details';
import { DishSearchComponent } from 'src/app/dishes/dish-search/dish-search.component';
import { AuthService } from 'src/app/main/auth/auth.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  restaurantId: string = "";
  restaurant: RestaurantDetails = {
    id: this.restaurantId,
    name: "",
    description: "",
    imageUrl: "",
    isVisible: false
  };
  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  @ViewChild(DishSearchComponent) dishSearch!: DishSearchComponent;
  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.restaurantId = x['id'];
        this.apiService.getRestaurantDetails({
          id: this.restaurantId
        }, this.authService.loggedInUser?.access_token!).subscribe(x => 
          {
            this.restaurant = x;
            this.isLoadingSubject.next(false);
          }, x => {
          this.snackBar.open("Restaurant with specified Id does not exist", "", {duration: 3000});
          this.router.navigate(['']);
        });
      });
  }
}
