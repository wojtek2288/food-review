using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Restaurant : IAggregateRoot
{
    public Guid Id { get; private init; }
    public string Name { get; private set; } = default!;
    public string? Description { get; private set; }
    public bool IsVisible { get; private set; }
    public IReadOnlyList<Dish> Dishes => dishes;

    private List<Dish> dishes = new();

    private Restaurant() { }

    public static Restaurant Create(string name, string? description, bool isVisible)
    {
        return new Restaurant
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            IsVisible = isVisible,
        };
    }

    public void Edit(string name, string? description)
    {
        Name = name;
        Description = description;
    }

    public void ChangeVisibility(bool isVisible)
    {
        IsVisible = isVisible;
    }

    public void AddDish(Dish dish)
    {
        dishes.Add(dish);
    }

    public void DeleteDish(Dish dish)
    {
        dishes.Remove(dish);
    }

    public void EditDish(Guid dishId, string name, string? description, decimal price)
    {
        if (!Dishes.Any(d => d.Id == dishId))
        {
            throw new InvalidOperationException($"Dish with specified Id {dishId} does not exist.");
        }

        var dish = Dishes.Single(d => d.Id == dishId);
        dish.Edit(name, description, price);
    }
}
