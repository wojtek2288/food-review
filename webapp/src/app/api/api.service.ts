import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiUser } from "./model/api-user";

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
        return this.http.post<ApiUser>(`${environment.authURL}/connect/token`, body, {headers: headers});
    }
}