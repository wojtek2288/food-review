import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { DishDetails } from 'src/app/api/model/dish-details';
import { AuthService } from 'src/app/main/auth/auth.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  dishId: string = "";
  dish: DishDetails = {
    id: this.dishId,
    name: "",
    description: "",
    imageUrl: "",
    restaurantId: "",
    restaurantName: ""
  };
  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.dishId = x['id'];
        this.apiService.getDishDetails({
          id: this.dishId
        }, this.authService.loggedInUser?.access_token!).subscribe(x => 
          {
            this.dish = x;
            this.isLoadingSubject.next(false);
          }, x => {
          this.snackBar.open("Dish with specified Id does not exist", "", {duration: 3000});
          this.router.navigate(['']);
        });
      });
  }
}
