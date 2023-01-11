namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class DishDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string RestaurantName { get; set; }
    public string RestaurantId { get; set; }
    public string ImageUrl { get; set; }
    public decimal Price { get; set; }
    public List<TagDTO> Tags { get; set; }
}