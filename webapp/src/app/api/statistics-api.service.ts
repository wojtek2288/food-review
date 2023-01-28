import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../main/auth/auth.service";
import { ConfirmationDialogComponent } from "../main/confirmation-dialog/confirmation-dialog.component";
import { Review } from "../reviews/model/review.interface";
import { ApiService } from "./api.service";
import { ChartSeries } from "./model/chart-series";
import { ChartSeriesItem } from "./model/chart-series-item";
import { PaginatedQueryResult } from "./model/paginated-query-results";
import { ReviewQueryCriteria } from "./model/review-query-criteria";

@Injectable({
    providedIn: "root",
})
export class StatisticsApiService {
    private isLoadingSubject = new Subject<boolean>();
    public isLoading$ = this.isLoadingSubject.asObservable();
    private mostPopularRestaurantsSubject = new Subject<ChartSeriesItem<number>[]>();
    public mostPopularRestaurants$ = this.mostPopularRestaurantsSubject.asObservable();

    constructor(
        private apiService: ApiService) {
    }

    public getMostPopularRestaurants() {
        this.isLoadingSubject.next(true);
        this.apiService.getMostPopularRestaurants().subscribe(x => {
            this.mostPopularRestaurantsSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }
}