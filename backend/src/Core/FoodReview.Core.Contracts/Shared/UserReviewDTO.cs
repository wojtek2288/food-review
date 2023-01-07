namespace FoodReview.Core.Contracts.Shared;

public class UserReviewDTO
{
    public DishSummaryDTO? dishReview { get; set; }
    public RestaurantSummaryDTO? restaurantReview { get; set; }
}