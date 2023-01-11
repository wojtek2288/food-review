export interface PaginatedQueryResult<T> {
    totalCount: number
    items: T[]
}