import { PaginatedQueryCriteria } from "./paginated-query-criteria";

export interface ReviewQueryCriteria extends PaginatedQueryCriteria {
    restaurantId: string | undefined;
    dishId: string | undefined;
}