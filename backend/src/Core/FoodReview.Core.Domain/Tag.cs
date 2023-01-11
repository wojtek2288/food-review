using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Tag : IAggregateRoot
{
    public Guid Id { get; private init; }
    public string Name { get; private set; } = default!;
    public string ColorHex { get; private set; } = default!;
    
    public ICollection<Restaurant> Restaurants { get; set; }
    public ICollection<Dish> Dishes { get; set; }

    public static Tag Create(string name, string colorHex)
    {
        return new Tag
        {
            Id = Guid.NewGuid(),
            Name = name,
            ColorHex = colorHex,
        };
    }
}