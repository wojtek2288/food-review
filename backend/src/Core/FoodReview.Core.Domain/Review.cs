using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Review : IAggregateRoot
{
    public Guid Id { get; private init; }
    public User User { get; private set; } = default!;
    public Restaurant Restaurant { get; private set; } = default!;
    public Dish? Dish { get; private set; }
    public string Description { get; private set; } = default!;
    public double Rating { get; private set; }
    public DateTime DateAdded { get; private init; }

    private Review() { }

    public static Review Create(
        User user,
        Restaurant restaurant,
        Dish? dish,
        string description,
        double rating)
    {
        if (rating is > 10 or < 1)
        {
            throw new InvalidOperationException("Rating has to be within 1-10 range.");
        }

        return new Review
        {
            Id = Guid.NewGuid(),
            User = user,
            Restaurant = restaurant,
            Dish = dish,
            Description = description,
            Rating = rating,
            DateAdded = DateTime.Now,
        };
    }

    public void Edit(string description, double rating)
    {
        if (rating is > 10 or < 1)
        {
            throw new InvalidOperationException("Rating has to be within 1-10 range.");
        }

        Description = description;
        Rating = rating;
    }
}