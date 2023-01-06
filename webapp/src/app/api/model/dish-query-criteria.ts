import { PaginatedQueryCriteria } from "./paginated-query-criteria";

export interface DishQueryCriteria extends PaginatedQueryCriteria {
    restaurantId: string;
}