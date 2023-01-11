namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class ReviewDTO
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public string Username { get; set; }
    public string RestaurantId { get; set; }
    public string RestaurantName { get; set; }
    public string? DishId { get; set; }
    public string? DishName { get; set; }
    public string Description { get; set; } = default!;
    public double Rating { get; set; }
}