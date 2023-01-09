import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishApiService } from 'src/app/api/dish-api.service';
import { DishDetails } from 'src/app/api/model/dish-details';
import { Tag } from 'src/app/api/model/tag';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  isLoading$ = this.dishService.isLoading$;
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

  constructor(private dishService: DishApiService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.dishId = x['id'];
        this.getDetails();
      });
    this.dishService.dishDetails$.subscribe(x => this.dish = x);
    this.dishService.afterCommandFinished$.subscribe(x => this.getDetails());
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
