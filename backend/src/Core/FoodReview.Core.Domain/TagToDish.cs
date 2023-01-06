namespace FoodReview.Core.Domain;

public record TagToDish
{
    public Guid DishId { get; init; }
    public Guid TagId { get; init; }
}