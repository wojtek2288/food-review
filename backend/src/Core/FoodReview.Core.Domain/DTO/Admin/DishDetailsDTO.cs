namespace FoodReview.Core.Domain.DTO.Admin;

public class DishDetailsDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string RestaurantName { get; set; }
    public string ImageUrl { get; set; }
}