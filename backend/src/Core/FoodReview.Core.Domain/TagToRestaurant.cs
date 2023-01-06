namespace FoodReview.Core.Domain;

public record TagToRestaurant
{
    public Guid RestaurantId { get; init; }
    public Guid TagId { get; init; }
}