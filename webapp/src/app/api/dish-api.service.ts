import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Dish } from "../dishes/model/dish.interface";
import { AuthService } from "../main/auth/auth.service";
import { ConfirmationDialogComponent } from "../main/confirmation-dialog/confirmation-dialog.component";
import { EditDishDetailsDialogComponent } from "../main/edit-dish-details-dialog/edit-dish-details-dialog.component";
import { ApiService } from "./api.service";
import { DishDetails } from "./model/dish-details";
import { DishQueryCriteria } from "./model/dish-query-criteria";
import { EditDishRequest } from "./model/edit-dish-request";
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

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
        private location: Location
    ) { }

    public getDishes(criteria: DishQueryCriteria) {
        this.isLoadingSubject.next(true);
        this.apiService.getDishes(criteria).subscribe(x => {
            this.dishesSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }

    public getDishDetails(id: string): void {
        this.isLoadingSubject.next(true);
        this.apiService.getDishDetails({
            id: id
        }).subscribe(x => {
            this.dishDetailsSubject.next(x);
            this.isLoadingSubject.next(false);
        }, x => {
            this.snackBar.open("Dish with specified Id does not exist", "", { duration: 3000 });
            this.router.navigate(['']);
        });
    }

    public addDish(restaurantId: string): void {
        const dialogRef = this.dialog.open(EditDishDetailsDialogComponent, {
            data: {
                name: "",
                description: "",
                imageUrl: ""
            },
            width: "500px"
        });
        dialogRef.afterClosed().subscribe(x => {
            if (x) {
                this.isLoadingSubject.next(true);
                this.apiService.addDish(Object.assign({
                    restaurantId: restaurantId
                }, x)).subscribe(
                    _ => {
                        this.snackBar.open("Successfuly added dish", "", { duration: 3000 });
                        this.afterCommandFinishedSubject.next();
                    },
                    x => this.snackBar.open("Adding dish did not succeed", "", { duration: 3000 })
                );
            }
        });
    }

    public editDish(data: EditDishRequest): void {
        const dialogRef = this.dialog.open(EditDishDetailsDialogComponent, {
            data: { ...data },
            width: "500px"
        });
        dialogRef.afterClosed().subscribe(x => {
            if (x) {
                this.isLoadingSubject.next(true);
                this.apiService.editDish(Object.assign({
                    id: data.id
                }, x)).subscribe(
                    _ => {
                        this.snackBar.open("Successfuly edited dish", "", { duration: 3000 });
                        this.afterCommandFinishedSubject.next();
                    },
                    x => this.snackBar.open("Editing dish did not succeed", "", { duration: 3000 })
                );
            }
        });
    }

    public deleteDish(id: string): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(x => {
            if (x) {
                this.isLoadingSubject.next(true);
                this.apiService.deleteDish({
                    id: id
                }).subscribe(
                    _ => {
                        this.snackBar.open("Successfuly deleted dish", "", { duration: 3000 });
                        if (!this.router.url.startsWith('/dishes/details'))
                            this.afterCommandFinishedSubject.next();
                        else
                        {
                            this.location.back();
                            this.isLoadingSubject.next(false);
                        }
                    },
                    x => this.snackBar.open("Dish with specified Id does not exist", "", { duration: 3000 })
                );
            }
        });
    }
}