export interface PaginatedQueryResult<T> {
    totalItems: number
    items: T[]
}