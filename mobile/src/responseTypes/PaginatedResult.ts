export default interface PaginatedResult<T> {
    totalCount: number;
    items: T[];
}