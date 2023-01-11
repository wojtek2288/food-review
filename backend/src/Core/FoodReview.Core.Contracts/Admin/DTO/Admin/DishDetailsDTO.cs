namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class DishDetailsDTO
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string RestaurantName { get; set; } = default!;
    public string RestaurantId { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public decimal Price { get; set; }
    public List<TagDTO> Tags { get; set; } = new();
}