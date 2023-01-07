import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Dish } from "../dishes/model/dish.interface";
import { AuthService } from "../main/auth/auth.service";
import { ConfirmationDialogComponent } from "../main/confirmation-dialog/confirmation-dialog.component";
import { ApiService } from "./api.service";
import { DishDetails } from "./model/dish-details";
import { DishQueryCriteria } from "./model/dish-query-criteria";
import { PaginatedQueryResult } from "./model/paginated-query-results";

@Injectable({
    providedIn: "root",
})
export class DishApiService {
    private isLoadingSubject = new Subject<boolean>();
    public isLoading$ = this.isLoadingSubject.asObservable();
    private dishesSubject = new Subject<PaginatedQueryResult<Dish>>();
    public dishes$ = this.dishesSubject.asObservable();
    private dishDetailsSubject = new Subject<DishDetails>();
    public dishDetails$ = this.dishDetailsSubject.asObservable();
    private afterCommandFinishedSubject = new Subject<void>();
    public afterCommandFinished$ = this.afterCommandFinishedSubject.asObservable();

    constructor(private apiService: ApiService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {}

    public getDishes(criteria: DishQueryCriteria)
    {
        this.isLoadingSubject.next(true);
        this.apiService.getDishes(criteria, this.authService.loggedInUser?.access_token!).subscribe(x => 
        {
            this.dishesSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }

    public getDishDetails(id: string): void {
        this.isLoadingSubject.next(true);
        this.apiService.getDishDetails({
          id: id
        }, this.authService.loggedInUser?.access_token!).subscribe(x => 
          {
            this.dishDetailsSubject.next(x);
            this.isLoadingSubject.next(false);
          }, x => {
          this.snackBar.open("Dish with specified Id does not exist", "", {duration: 3000});
          this.router.navigate(['']);
        });
    }
    
    public deleteDish(id: string): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(x => {
          if (x)
          {
            this.isLoadingSubject.next(true);
            this.apiService.deleteDish({
              id: id
            }, this.authService.loggedInUser?.access_token!).subscribe(
              _ => {
                this.snackBar.open("Successfuly deleted dish", "", {duration: 3000});
                this.afterCommandFinishedSubject.next();
              },
              x => this.snackBar.open("Dish with specified Id does not exist", "", {duration: 3000})
            );
          }
        });
    }
}