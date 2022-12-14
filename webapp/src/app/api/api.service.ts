import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Restaurant } from "../restaurants/model/restaurant.interface";
import { ApiUser } from "./model/api-user";
import { PaginatedQueryCriteria } from "./model/paginated-query-criteria";

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

    getRestaurants(query: PaginatedQueryCriteria, token: string): Observable<Restaurant[]>
    {
        return this.http.post<Restaurant[]>(`${environment.apiURL}/api/query/FoodReview.Core.Contracts.Mobile.Restaurants.SearchRestaurants`, query, {headers: this.getHeaders(token)});
    }
}