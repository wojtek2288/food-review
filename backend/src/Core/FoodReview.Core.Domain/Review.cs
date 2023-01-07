using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Review : IAggregateRoot
{
    public Guid Id { get; private init; }
    public Guid UserId { get; private set; }
    public Guid RestaurantId { get; private set; }
    public Guid? DishId { get; private set; }
    public string? Description { get; private set; } = default!;
    public double Rating { get; private set; }
    public DateTime DateAdded { get; private init; }

    private Review() { }

    public static Review Create(
        Guid userId,
        Guid restaurantId,
        Guid? dishId,
        string? description,
        double rating)
    {
        if (rating > 10 || rating < 1)
        {
            throw new InvalidOperationException("Rating has to be within 1-10 range.");
        }

        return new Review
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            RestaurantId = restaurantId,
            DishId = dishId,
            Description = description,
            Rating = rating,
            DateAdded = DateTime.Now,
        };
    }

    public void Edit(string description, double rating)
    {
        if (rating > 10 || rating < 1)
        {
            throw new InvalidOperationException("Rating has to be within 1-10 range.");
        }

        Description = description;
        Rating = rating;
    }
}