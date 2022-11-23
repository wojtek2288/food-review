import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Dish } from '../model/dish.interface';

@Component({
  selector: 'app-dish-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class DishSearchComponent extends BaseSearchComponent<Dish> implements OnInit {
  constructor() {
    super();
    this.dataSource = new MatTableDataSource<Dish>(ELEMENT_DATA);
    this.displayedColumns = ['id', 'name', 'restaurantName', 'description', 'showDetails'];
  }

  ngOnInit(): void {
    this.header = "Dishes";
    this.dataSource.filterPredicate = (dish, filter) => dish.name.toLowerCase().includes(filter.toLowerCase()) || 
      dish.description.toLowerCase().includes(filter.toLowerCase()) || dish.restaurantName.toLowerCase().includes(filter.toLowerCase());
  }

  override onSearch(): void {
    this.dataSource.filter = this.searchFormControl.value;
  }
}

const ELEMENT_DATA: Dish[] = [
  {id: "a4edcbc9-ad80-44e4-a576-3b4d17fb65b1", name: "Zinger", restaurantName: 'KFC', description: "Zinger description"},
  {id: "277ae622-5e42-42f9-995f-18524f1aecbf", name: "Strips", restaurantName: 'KFC', description: "Strips description"},
  {id: "0ea4f8b8-a3f2-47f2-ba5b-0b7b34c9692f", name: "Twister", restaurantName: 'KFC', description: "Twister descritpion"},
  {id: "b5401d41-bc23-4f3d-996d-337666401b42", name: "BigMac", restaurantName: 'McDonald\'s', description: "BigMac description"},
  {id: "9698ecb8-fbda-439b-90a5-e3c6889c17c0", name: "French fries", restaurantName: 'McDonald\'s', description: "French fries description"},
  {id: "7926b35b-ac00-4d59-93b1-6eecf7106c1c", name: "Ice cream", restaurantName: 'McDonald\'s', description: "Ice cream description"},
  {id: "54c806bd-7e78-4eca-b53b-383f12597d87", name: "Margherita", restaurantName: 'Pizza Hut', description: "Margherita description"},
  {id: "23083280-7be4-47fa-a979-8ccee9fd8bd4", name: "Salami", restaurantName: 'Pizza Hut', description: "Salami description"},
];