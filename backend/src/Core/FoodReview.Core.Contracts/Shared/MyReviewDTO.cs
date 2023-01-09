namespace FoodReview.Core.Contracts.Shared;

public class MyReviewDTO
{
    public DishReviewDTO? dishReview { get; set; }
    public RestaurantReviewDTO? restaurantReview { get; set; }
}