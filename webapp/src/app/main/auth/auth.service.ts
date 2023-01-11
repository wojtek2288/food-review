import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiService } from "src/app/api/api.service";
import { ApiUser } from "src/app/api/model/api-user";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoadingSubject.asObservable();
    public loggedInUser: ApiUser | null = null;
    public isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private api: ApiService,
        private router: Router,
        private snackBar: MatSnackBar) {
        const user = localStorage.getItem('apiUser');
        if (user) {
            this.loggedInUser = JSON.parse(user);
            this.isUserLoggedIn$.next(true);
        }
    }

    login(username: string, password: string): void {
        this.isLoadingSubject.next(true);
        this.api.loginAdmin(username, password).subscribe(response => {
            const role = (<any>jwtDecode(response.access_token))['role'];
            if(role !== 'admin')
            {
                this.snackBar.open("You do not have permission to access this site", "", { duration: 3000 });
                this.isLoadingSubject.next(false);
                return;
            }
            this.loggedInUser = response;
            localStorage.setItem('apiUser', JSON.stringify(this.loggedInUser));
            this.isUserLoggedIn$.next(true);
            this.isLoadingSubject.next(false);
        },
            () => {
                this.snackBar.open("Login failed", "", { duration: 3000 });
                this.isLoadingSubject.next(false);
            },
            () => this.router.navigate(['/restaurants']));
    }

    logout(): void {
        localStorage.clear();
        this.loggedInUser = null;
        this.isUserLoggedIn$.next(false);
        this.router.navigate(['/login']);
    }
}