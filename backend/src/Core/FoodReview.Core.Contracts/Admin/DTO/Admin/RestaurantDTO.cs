namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class RestaurantDTO
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public bool IsVisible { get; set; }
    public string ImageUrl { get; set; } = default!;
    public List<TagDTO> Tags { get; set; } = new();
}