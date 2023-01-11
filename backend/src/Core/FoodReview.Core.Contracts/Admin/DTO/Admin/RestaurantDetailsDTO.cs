namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class RestaurantDetailsDTO
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = default!;
    public bool IsVisible { get; set; }
    public List<TagDTO> Tags { get; set; } = new();
}