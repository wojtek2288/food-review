import PaginatedRequest from "./PaginatedRequest";

export default interface DishReviewsRequest extends PaginatedRequest {
    dishId: string;
}