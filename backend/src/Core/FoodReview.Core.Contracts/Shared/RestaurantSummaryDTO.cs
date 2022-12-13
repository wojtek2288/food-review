namespace FoodReview.Core.Contracts.Shared;

public class RestaurantSummaryDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double? Rating { get; set; }
}
