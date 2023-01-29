import { Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, startWith, Subject, takeUntil } from 'rxjs';
import { ReviewApiService } from 'src/app/api/review-api.service';
import { UserApiService } from 'src/app/api/user-api.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { Review } from '../model/review.interface';

@Component({
    selector: 'app-review-search',
    templateUrl: '../../main/base-search/base-search.component.html',
    styleUrls: ['../../main/base-search/base-search.component.css']
})
export class ReviewSearchComponent extends BaseSearchComponent<Review> {
    @Input() restaurantId: string = "";
    @Input() dishId: string = "";
    @Input() userId: string = "";

    constructor(
        private reviewService: ReviewApiService,
        private userService: UserApiService) {
        super();
        this.dataSource = new MatTableDataSource<Review>();
        this.displayedColumns = ['id', 'username', 'restaurantName', 'dishName', 'description', 'rating', 'reviewButtons'];
        this.header = "Reviews";
        this.isLoading$ = combineLatest([this.reviewService.isLoading$.pipe(startWith(true)), this.userService.isLoading$.pipe(startWith(false))], (x, y) => x || y);
        this.reviewService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.onSearch();
        });
        this.userService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.onSearch();
        })
        this.reviewService.reviews$.subscribe(x => {
            this.dataSource.data = x.items;
            this.paginator.length = x.totalCount;
        });
    }

    override onSearch(): void {
        this.reviewService.getReviews({
            sortingField: this.sortingField,
            sortingDirection: this.sortingDirection,
            pageCount: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            searchPhrase: this.searchFormControl.value,
            restaurantId: this.restaurantId,
            dishId: this.dishId,
            userId: this.userId
        });
    }

    override onDelete(rowData: Review): void {
        this.reviewService.deleteReview(rowData.id);
    }

    override onBan(rowData: Review): void {
        this.userService.banUser(rowData.userId);
    }
}
