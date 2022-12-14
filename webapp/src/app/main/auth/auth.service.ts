import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiService } from "src/app/api/api.service";
import { ApiUser } from "src/app/api/model/api-user";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
 })
 export class AuthService {
     public loggedInUser: ApiUser | null = null;
     public isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

     constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar)
     {
         const user = localStorage.getItem('apiUser');
         if (user)
         {
             this.loggedInUser = JSON.parse(user);
             this.isUserLoggedIn$.next(true);
         }
     }

     login(username: string, password: string): void
     {
        this.api.loginAdmin(username, password).subscribe(response => {
            this.loggedInUser = response;
            localStorage.setItem('apiUser', JSON.stringify(this.loggedInUser));
            this.isUserLoggedIn$.next(true);
        },
        () => this.snackBar.open("Login failed", "", {duration: 3000}),
        () => this.router.navigate(['/restaurants']));
     }
 }