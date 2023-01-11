import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../main/auth/auth.service";
import { ConfirmationDialogComponent } from "../main/confirmation-dialog/confirmation-dialog.component";
import { User } from "../users/model/user.interface";
import { ApiService } from "./api.service";
import { PaginatedQueryCriteria } from "./model/paginated-query-criteria";
import { PaginatedQueryResult } from "./model/paginated-query-results";
import { UserDetails } from "./model/user-details";

@Injectable({
    providedIn: "root",
})
export class UserApiService {
    private isLoadingSubject = new Subject<boolean>();
    public isLoading$ = this.isLoadingSubject.asObservable();
    private usersSubject = new Subject<PaginatedQueryResult<User>>();
    public users$ = this.usersSubject.asObservable();
    private userDetailsSubject = new Subject<UserDetails>();
    public userDetails$ = this.userDetailsSubject.asObservable();
    private afterCommandFinishedSubject = new Subject<void>();
    public afterCommandFinished$ = this.afterCommandFinishedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router) {
    }

    public getUsers(criteria: PaginatedQueryCriteria) {
        this.isLoadingSubject.next(true);
        this.apiService.getUsers(criteria, this.authService.loggedInUser?.access_token!).subscribe(x => {
            this.usersSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }

    public getUserDetails(id: string): void {
        this.isLoadingSubject.next(true);
        this.apiService.getUserDetails({
            id: id
        }, this.authService.loggedInUser?.access_token!).subscribe(x => {
            this.userDetailsSubject.next(x);
            this.isLoadingSubject.next(false);
        }, x => {
            this.snackBar.open("User with specified Id does not exist", "", { duration: 3000 });
            this.router.navigate(['']);
        });
    }

    public banUser(id: string): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(x => {
            if (x) {
                this.isLoadingSubject.next(true);
                this.apiService.banUser({
                    id: id
                }, this.authService.loggedInUser?.access_token!).subscribe(
                    _ => {
                        this.snackBar.open("Successfuly banned user", "", { duration: 3000 });
                        this.isLoadingSubject.next(false);
                        this.afterCommandFinishedSubject.next();
                    },
                    x => this.snackBar.open("User with specified Id does not exist", "", { duration: 3000 })
                );
            }
        });
    }
}