import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
    ) {
    }

    getHeaders(token: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }

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

    getRestaurants(query: PaginatedQueryCriteria, token: string): Observable<PaginatedQueryResult<Restaurant>> {
        return this.http.post<PaginatedQueryResult<Restaurant>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.SearchRestaurants`, query, { headers: this.getHeaders(token) });
    }

    getRestaurantDetails(query: DetailsRequest, token: string): Observable<RestaurantDetails> {
        return this.http.post<RestaurantDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.RestaurantDetails`, query, { headers: this.getHeaders(token) });
    }

    toggleRestaurantVisibility(query: DetailsRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.ToggleRestaurantVisibility`, query, { headers: this.getHeaders(token) });
    }

    addRestaurant(query: AddRestaurantRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.AddRestaurant`, query, { headers: this.getHeaders(token) });
    }

    editRestaurant(query: EditRestaurantRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.EditRestaurant`, query, { headers: this.getHeaders(token) });
    }

    deleteRestaurant(query: DetailsRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.DeleteRestaurant`, query, { headers: this.getHeaders(token) });
    }

    getDishes(query: DishQueryCriteria, token: string): Observable<PaginatedQueryResult<Dish>> {
        return this.http.post<PaginatedQueryResult<Dish>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.SearchDishes`, query, { headers: this.getHeaders(token) });
    }

    getDishDetails(query: DetailsRequest, token: string): Observable<DishDetails> {
        return this.http.post<DishDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.DishDetails`, query, { headers: this.getHeaders(token) });
    }

    addDish(query: AddDishRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.AddDish`, query, { headers: this.getHeaders(token) });
    }

    editDish(query: EditDishRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.EditDish`, query, { headers: this.getHeaders(token) });
    }

    deleteDish(query: DetailsRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Dishes.DeleteDish`, query, { headers: this.getHeaders(token) });
    }

    getUsers(query: PaginatedQueryCriteria, token: string): Observable<PaginatedQueryResult<User>> {
        return this.http.post<PaginatedQueryResult<User>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Users.SearchUsers`, query, { headers: this.getHeaders(token) });
    }

    getUserDetails(query: DetailsRequest, token: string): Observable<UserDetails> {
        return this.http.post<UserDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Users.UserDetails`, query, { headers: this.getHeaders(token) });
    }

    banUser(query: DetailsRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Users.BanUser`, query, { headers: this.getHeaders(token) });
    }

    getReviews(query: ReviewQueryCriteria, token: string): Observable<PaginatedQueryResult<Review>> {
        return this.http.post<PaginatedQueryResult<Review>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Reviews.SearchReviews`, query, { headers: this.getHeaders(token) });
    }

    deleteReview(query: DetailsRequest, token: string): Observable<void> {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Reviews.DeleteReview`, query, { headers: this.getHeaders(token) });
    }

    getTags(token: string): Observable<Tag[]> {
        return this.http.post<Tag[]>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Tags.GetTags`, { headers: this.getHeaders(token) });
    }
}