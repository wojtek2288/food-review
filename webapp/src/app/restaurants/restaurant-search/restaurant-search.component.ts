import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/main/auth/auth.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Restaurant } from '../model/restaurant.interface';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class RestaurantSearchComponent extends BaseSearchComponent<Restaurant> implements OnInit {
  constructor(private apiService: ApiService, private authService: AuthService) {
    super();
    this.dataSource = new MatTableDataSource<Restaurant>(ELEMENT_DATA);
    this.displayedColumns = ['id', 'name','description', 'showDetails'];
  }

  ngOnInit(): void {
    this.apiService.getRestaurants({
      pageCount: 0,
      pageSize: 10,
      searchPhrase: ""
    }, this.authService.loggedInUser?.access_token!). subscribe(x => console.log(x));
    this.header = "Restaurants";
    this.dataSource.filterPredicate = (restuaurant, filter) => restuaurant.name.toLowerCase().includes(filter.toLowerCase()) || 
      restuaurant.description.toLowerCase().includes(filter.toLowerCase());
  }

  override onSearch(): void {
    this.dataSource.filter = this.searchFormControl.value;
  }
}

const ELEMENT_DATA: Restaurant[] = [
  {id: "a4edcbc9-ad80-44e4-a576-3b4d17fb65b1", name: 'KFC', description: "KFC (Kentucky Fried Chicken) is an American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken. It is the world's second-largest restaurant chain (as measured by sales) after McDonald's, with 22,621 locations globally in 150 countries as of December 2019. The chain is a subsidiary of Yum! Brands, a restaurant company that also owns the Pizza Hut and Taco Bell chains."},
  {id: "277ae622-5e42-42f9-995f-18524f1aecbf", name: 'McDonald\'s', description: "McDonald's Corporation is an American multinational fast food chain, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States. They rechristened their business as a hamburger stand, and later turned the company into a franchise, with the Golden Arches logo being introduced in 1953 at a location in Phoenix, Arizona."},
  {id: "0ea4f8b8-a3f2-47f2-ba5b-0b7b34c9692f", name: 'Subway', description: "Subway is an American multinational fast food restaurant franchise that specializes in submarine sandwiches (subs), wraps, salads and drinks."},
  {id: "b5401d41-bc23-4f3d-996d-337666401b42", name: 'Taco Bell', description: "Taco Bell is an American-based chain of fast food restaurants founded in 1962 by Glen Bell (1923–2010) in Downey, California. Taco Bell is a subsidiary of Yum! Brands, Inc. The restaurants serve a variety of Mexican-inspired foods, including tacos, burritos, quesadillas, nachos, novelty and speciality items, and a variety of 'value menu' items. As of 2018, Taco Bell serves over two billion customers each year, at 7,072 restaurants, more than 93 percent of which are owned and operated by independent franchisees and licensees."},
  {id: "9698ecb8-fbda-439b-90a5-e3c6889c17c0", name: 'MAX Burgers', description: "Max Burgers Aktiebolag (Max Burgers Incorporated), earlier Max Hamburgerrestauranger AB, is a Swedish fast food corporation."},
  {id: "7926b35b-ac00-4d59-93b1-6eecf7106c1c", name: 'Pizza Hut', description: "Pizza Hut is an American multinational restaurant chain and international franchise founded in 1958 in Wichita, Kansas by Dan and Frank Carney. They serve their signature pan pizza and other dishes including pasta, breadsticks and dessert at dine-in, take-out and delivery chain locations. They also serve chicken wings on their WingStreet menu."},
  {id: "54c806bd-7e78-4eca-b53b-383f12597d87", name: 'Domino\'s Pizza', description: "Domino's Pizza, Inc., trading as Domino's, is an American multinational pizza restaurant chain founded in 1960 and led by CEO Russell Weiner. The corporation is Delaware domiciled and headquartered at the Domino's Farms Office Park in Ann Arbor, Michigan. As of 2018, Domino's had approximately 15,000 stores, with 5,649 in the United States, 1,500 in India, and 1,249 in the United Kingdom. Domino's has stores in over 83 countries and 5,701 cities worldwide."},
  {id: "23083280-7be4-47fa-a979-8ccee9fd8bd4", name: 'Salad Story', description: "Salad Story to propozycja dla smakoszy, którzy cenią sobie jakość i smak zdrowego, lekkiego i świeżego, ale i szybko podanego posiłku. Do przyrządzenia posiłków używamy jedynie świeżych, naturalnych składników najwyższej jakości."},
];