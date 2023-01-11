using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class Restaurant : IAggregateRoot
{
    public Guid Id { get; private init; }
    public string Name { get; private set; } = default!;
    public string? Description { get; private set; }
    public string ImageUrl { get; private set; } = default!;
    public bool IsVisible { get; private set; }
    public IReadOnlyList<Dish> Dishes => dishes;

    public ICollection<Tag> Tags { get; set; }
    //public List<TagToRestaurant> Tags => tags;

    private List<Dish> dishes = new();
    private List<TagToRestaurant> tags = new();

    private Restaurant() { }

    public static Restaurant Create(
        string name,
        string? description,
        string imageUrl,
        bool isVisible)
    {
        return new Restaurant
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            ImageUrl = imageUrl,
            IsVisible = isVisible,
        };
    }

    public void Edit(string name, string? description, string imageUrl)
    {
        Name = name;
        Description = description;
        ImageUrl = imageUrl;
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

    public void EditDish(Guid dishId, string name, string? description, string imageUrl, decimal price)
    {
        if (!Dishes.Any(d => d.Id == dishId))
        {
            throw new InvalidOperationException($"Dish with specified Id {dishId} does not exist.");
        }

        var dish = Dishes.Single(d => d.Id == dishId);
        dish.Edit(name, description, imageUrl, price);
    }
}
