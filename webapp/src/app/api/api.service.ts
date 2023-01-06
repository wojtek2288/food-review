import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dish } from "../dishes/model/dish.interface";
import { Restaurant } from "../restaurants/model/restaurant.interface";
import { Review } from "../reviews/model/review.interface";
import { User } from "../users/model/user.interface";
import { ApiUser } from "./model/api-user";
import { DetailsRequest } from "./model/details-request";
import { DishDetails } from "./model/dish-details";
import { DishQueryCriteria } from "./model/dish-query-criteria";
import { PaginatedQueryCriteria } from "./model/paginated-query-criteria";
import { PaginatedQueryResult } from "./model/paginated-query-results";
import { RestaurantDetails } from "./model/restaurant-details";
import { ReviewQueryCriteria } from "./model/review-query-criteria";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    address = environment.apiURL;

    constructor(private http: HttpClient) {}

    getHeaders(token: string): HttpHeaders{
        return new HttpHeaders({
            'Content-Type':  'application/json',
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
            'Content-Type':  'application/x-www-form-urlencoded',
        })
        return this.http.post<ApiUser>(`${environment.apiURL}/auth/connect/token`, body, {headers: headers});
    }

    getRestaurants(query: PaginatedQueryCriteria, token: string): Observable<PaginatedQueryResult<Restaurant>>
    {
        return this.http.post<PaginatedQueryResult<Restaurant>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.SearchRestaurants`, query, {headers: this.getHeaders(token)});
    }

    getRestaurantDetails(query: DetailsRequest, token: string): Observable<RestaurantDetails>
    {
        return this.http.post<RestaurantDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Restaurants.RestaurantDetails`, query, {headers: this.getHeaders(token)});
    }

    toggleRestaurantVisibility(query: DetailsRequest, token: string): Observable<void>
    {
        return this.http.post<void>(`${environment.apiURL}/api/command/FoodReview.Core.Contracts.Admin.Restaurants.ToggleRestaurantVisibility`, query, {headers: this.getHeaders(token)});
    }

    getDishes(query: DishQueryCriteria, token: string): Observable<PaginatedQueryResult<Dish>>
    {
        return this.http.post<PaginatedQueryResult<Dish>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.SearchDishes`, query, {headers: this.getHeaders(token)});
    }

    getDishDetails(query: DetailsRequest, token: string): Observable<DishDetails>
    {
        return this.http.post<DishDetails>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Dishes.DishDetails`, query, {headers: this.getHeaders(token)});
    }

    getUsers(query: PaginatedQueryCriteria, token: string): Observable<PaginatedQueryResult<User>>
    {
        return this.http.post<PaginatedQueryResult<User>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Users.SearchUsers`, query, {headers: this.getHeaders(token)});
    }

    getReviews(query: ReviewQueryCriteria, token: string): Observable<PaginatedQueryResult<Review>>
    {
        return this.http.post<PaginatedQueryResult<Review>>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Admin.Reviews.SearchReviews`, query, {headers: this.getHeaders(token)});
    }
}