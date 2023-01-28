import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../main/auth/auth.service";
import { ConfirmationDialogComponent } from "../main/confirmation-dialog/confirmation-dialog.component";
import { Review } from "../reviews/model/review.interface";
import { ApiService } from "./api.service";
import { PaginatedQueryResult } from "./model/paginated-query-results";
import { ReviewQueryCriteria } from "./model/review-query-criteria";

@Injectable({
    providedIn: "root",
})
export class ReviewApiService {
    private isLoadingSubject = new Subject<boolean>();
    public isLoading$ = this.isLoadingSubject.asObservable();
    private reviewsSubject = new Subject<PaginatedQueryResult<Review>>();
    public reviews$ = this.reviewsSubject.asObservable();
    private afterCommandFinishedSubject = new Subject<void>();
    public afterCommandFinished$ = this.afterCommandFinishedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar) {
    }

    public getReviews(criteria: ReviewQueryCriteria) {
        this.isLoadingSubject.next(true);
        this.apiService.getReviews(criteria).subscribe(x => {
            this.reviewsSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }

    public deleteReview(id: string): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(x => {
            if (x) {
                this.isLoadingSubject.next(true);
                this.apiService.deleteReview({
                    id: id
                }).subscribe(
                    _ => {
                        this.snackBar.open("Successfuly deleted review", "", { duration: 3000 });
                        this.afterCommandFinishedSubject.next();
                    },
                    x => this.snackBar.open("Review with specified Id does not exist", "", { duration: 3000 })
                );
            }
        });
    }
}