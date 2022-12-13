namespace FoodReview.Core.Contracts.Shared;

public class UserSummaryDTO
{
    public Guid Id { get; set; }
    public string Username { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public string? ImageUrl { get; set; }
}
