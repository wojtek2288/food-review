namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class RestaurantDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsVisible { get; set; }
    public string ImageUrl { get; set; }
    public List<TagDTO> Tags { get; set; }
}