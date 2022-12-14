import { HttpClient, HttpHeaders } from "@angular/common/http";
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
            'Content-Type':  'application/x-www-form-urlencoded',
            //'Authorization': `Bearer ${token}`
        })
    }

    loginAdmin(username: string, password: string): Observable<ApiUser> {
        const authData = {
            //client_id: "client_app",
            grant_type: "password",
            client_secret: "secret",
            username: username,
            password: password
        }
        console.log(authData)
        return this.http.post<ApiUser>(`${environment.authURL}/connect/token`, authData, {headers: this.getHeaders("")});
    }
}