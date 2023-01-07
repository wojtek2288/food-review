import Dish from "./Dish";
import Restaurant from "./Restaurant";

export default interface UserReviewResponse {
    dishReview: Dish | null;
    restaurantReview: Restaurant | null;
}