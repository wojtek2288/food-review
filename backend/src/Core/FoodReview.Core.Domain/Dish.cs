using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Dish : IEntity
{
    public Guid Id { get; private init; }
    public Restaurant Restaurant { get; private init; } = default!;
    public string Name { get; private set; } = default!;
    public string? Description { get; private set; }
    public decimal Price { get; private set; }

    private Dish() { }

    public static Dish Create(Restaurant restaurant, string name, string? description, decimal price)
    {
        return new Dish
        {
            Id = Guid.NewGuid(),
            Restaurant = restaurant,
            Name = name,
            Description = description,
            Price = price,
        };
    }

    public void Edit(string name, string? description, decimal price)
    {
        Name = name;
        Description = description;
        Price = price;
    }
}