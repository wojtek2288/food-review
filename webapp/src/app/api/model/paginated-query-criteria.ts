import { SortDirection } from "@angular/material/sort"

export interface PaginatedQueryCriteria {
    sortingField: string,
    sortingDirection: SortDirection,
    pageCount: number,
    pageSize: number,
    searchPhrase: string
}