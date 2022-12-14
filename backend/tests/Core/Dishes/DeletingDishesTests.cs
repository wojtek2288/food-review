using Xunit;
using FoodReview.Core.Domain;

namespace FoodReview.Tests.Core.Dishes;

public class DeletingDishesTests
{
    [Fact]
    public void Dish_can_be_deleted()
    {
        var restaurant = Restaurant.Create(
            "name",
            "description",
            "imageUrl",
            true);

        var dish = Dish.Create(restaurant, "name", "description", "imageUrl", 24);

        restaurant.AddDish(dish);
        Assert.Contains(dish, restaurant.Dishes);
        restaurant.DeleteDish(dish);
        Assert.Empty(restaurant.Dishes);
    }
}