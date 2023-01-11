namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class ReviewDTO
{
    public string Id { get; set; } = default!;
    public string UserId { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string RestaurantId { get; set; } = default!;
    public string RestaurantName { get; set; } = default!;
    public string? DishId { get; set; }
    public string? DishName { get; set; }
    public string Description { get; set; } = default!;
    public double Rating { get; set; }
}