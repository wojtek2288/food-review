import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiService } from "./api.service";
import { ChartSeriesItem } from "./model/chart-series-item";

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