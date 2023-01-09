export default interface AddReviewRequest {
    restaurantId: string;
    dishId: string | null;
    description: string | null;
    rating: number;
}