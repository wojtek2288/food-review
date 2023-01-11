using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Dish : IAggregateRoot
{
    public Guid Id { get; private init; }
    public Restaurant Restaurant { get; private init; } = default!;
    public string Name { get; private set; } = default!;
    public string? Description { get; private set; }
    public string ImageUrl { get; private set; } = default!;
    public decimal Price { get; private set; }
    public ICollection<Tag> Tags { get; set; }

    private Dish() { }

    public static Dish Create(
        Restaurant restaurant,
        string name,
        string? description,
        string imageUrl,
        decimal price)
    {
        return new Dish
        {
            Id = Guid.NewGuid(),
            Restaurant = restaurant,
            Name = name,
            Description = description,
            ImageUrl = imageUrl,
            Price = price,
        };
    }

    public void Edit(string name, string? description, string imageUrl, decimal price)
    {
        Name = name;
        Description = description;
        Price = price;
        ImageUrl = imageUrl;
    }
}