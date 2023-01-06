import PaginatedRequest from "./PaginatedRequest";

export default interface RestaurantDishesRequest extends PaginatedRequest {
    restaurantId: string;
}