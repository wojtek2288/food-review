import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dish } from "../dishes/model/dish.interface";
import { Restaurant } from "../restaurants/model/restaurant.interface";
import { Review } from "../reviews/model/review.interface";
import { User } from "../users/model/user.interface";
import { AddDishRequest } from "./model/add-dish-request";
import { AddRestaurantRequest } from "./model/add-restaurat-request";
import { ApiUser } from "./model/api-user";
import { DetailsRequest } from "./model/details-request";
import { DishDetails } from "./model/dish-details";
import { DishQueryCriteria } from "./model/dish-query-criteria";
import { EditDishRequest } from "./model/edit-dish-request";
import { EditRestaurantRequest } from "./model/edit-restaurant-request";
import { PaginatedQueryCriteria } from "./model/paginated-query-criteria";
import { PaginatedQueryResult } from "./model/paginated-query-results";
import { RestaurantDetails } from "./model/restaurant-details";
import { ReviewQueryCriteria } from "./model/review-query-criteria";
import { Tag } from "./model/tag";
import { UserDetails } from "./model/user-details";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    address = environment.apiURL;

    constructor(
        private http: HttpClient
    ) { }

    loginAdmin(username: string, password: string): Observable<ApiUser> {
        const body = new HttpParams()
            .set('client_id', 'admin_app')
            .set('grant_type', 'password')
            .set('username', username)
            .set('password', password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
        return this.http.post<ApiUser>(`${environment.apiURL}/auth/connect/token`, body, { headers: headers });
    }

    getRestaurants(query: PaginatedQueryCriteria): Observable<PaginatedQueryResult<Restaurant>> {
        return this.http.post<PaginatedQueryResult<Restaurant>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.SearchRestaurants`, query);
    }

    getRestaurantDetails(query: DetailsRequest): Observable<RestaurantDetails> {
        return this.http.post<RestaurantDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.RestaurantDetails`, query);
    }

    toggleRestaurantVisibility(query: DetailsRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.ToggleRestaurantVisibility`, query);
    }

    addRestaurant(query: AddRestaurantRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.AddRestaurant`, query);
    }

    editRestaurant(query: EditRestaurantRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.EditRestaurant`, query);
    }

    deleteRestaurant(query: DetailsRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.DeleteRestaurant`, query);
    }

    getDishes(query: DishQueryCriteria): Observable<PaginatedQueryResult<Dish>> {
        return this.http.post<PaginatedQueryResult<Dish>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.SearchDishes`, query);
    }

    getDishDetails(query: DetailsRequest): Observable<DishDetails> {
        return this.http.post<DishDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.DishDetails`, query);
    }

    addDish(query: AddDishRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.AddDish`, query);
    }

    editDish(query: EditDishRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.EditDish`, query);
    }

    deleteDish(query: DetailsRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.DeleteDish`, query);
    }

    getUsers(query: PaginatedQueryCriteria): Observable<PaginatedQueryResult<User>> {
        return this.http.post<PaginatedQueryResult<User>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Users.SearchUsers`, query);
    }

    getUserDetails(query: DetailsRequest): Observable<UserDetails> {
        return this.http.post<UserDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Users.UserDetails`, query);
    }

    banUser(query: DetailsRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Users.BanUser`, query);
    }

    getReviews(query: ReviewQueryCriteria): Observable<PaginatedQueryResult<Review>> {
        return this.http.post<PaginatedQueryResult<Review>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Reviews.SearchReviews`, query);
    }

    deleteReview(query: DetailsRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Reviews.DeleteReview`, query);
    }

    getTags(): Observable<Tag[]> {
        return this.http.post<Tag[]>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Tags.GetTags`, null);
    }
}