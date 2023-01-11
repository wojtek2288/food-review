namespace FoodReview.Core.Contracts.Shared;

public class RestaurantReviewDTO
{
    public Guid ReviewId { get; set; }
    public Guid RestaurantId { get; set; }
    public string Name { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double Rating { get; set; }
    public string? Description { get; set; }
    public List<TagDTO> Tags { get; set; } = default!;
}