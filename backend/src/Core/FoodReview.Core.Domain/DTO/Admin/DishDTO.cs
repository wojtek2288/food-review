namespace FoodReview.Core.Contracts.Admin;

public class DishDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string RestaurantName { get; set; }
}