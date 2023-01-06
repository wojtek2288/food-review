namespace FoodReview.Core.Contracts.Shared;

public class ReviewDTO
{
    public Guid Id { get; set; }
    public string? ImageUrl { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public double Rating { get; set; }
}