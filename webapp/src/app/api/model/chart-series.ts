import { ChartSeriesItem } from "./chart-series-item";

export interface ChartSeries<T> {
    name: string,
    series: ChartSeriesItem<T>[]
}