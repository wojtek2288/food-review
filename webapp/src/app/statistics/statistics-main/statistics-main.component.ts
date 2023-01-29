import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { ChartSeriesItem } from 'src/app/api/model/chart-series-item';
import { StatisticsApiService } from 'src/app/api/statistics-api.service';

@Component({
  selector: 'app-statistics-main',
  templateUrl: './statistics-main.component.html',
  styleUrls: ['./statistics-main.component.css']
})
export class StatisticsMainComponent implements OnInit {
  isLoading$: Observable<boolean> = of(true);
  header: string = "Top 5 most popular restaurants"
  multi: ChartSeriesItem<number>[] = [];
  private unsubscribe$ = new Subject();

  constructor(private statisticsService: StatisticsApiService) {
  }

  ngOnInit(): void {

    this.isLoading$ = this.statisticsService.isLoading$;
    this.statisticsService.mostPopularRestaurants$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      this.multi = x;
    });
    this.statisticsService.getMostPopularRestaurants();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
