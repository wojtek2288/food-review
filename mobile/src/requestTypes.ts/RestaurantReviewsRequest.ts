import PaginatedRequest from "./PaginatedRequest";

export default interface RestaurantReviewsRequest extends PaginatedRequest {
    restaurantId: string;
}