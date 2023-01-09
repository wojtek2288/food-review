export default interface MyReviewResponse {
    dishReview: DishReview | null;
    restaurantReview: RestaurantReview | null;
}

export interface DishReview {
    reviewId: string;
    dishId: string;
    restaurantName: string;
    name: string;
    imageUrl: string;
    rating: number;
    description: string | null;
}

export interface RestaurantReview {
    reviewId: string;
    restaurantId: string;
    name: string;
    imageUrl: string;
    rating: number;
    description: string | null;
}