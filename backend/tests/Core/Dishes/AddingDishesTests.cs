using Xunit;
using FoodReview.Core.Domain;

namespace FoodReview.Tests.Core.Dishes;

public class AddingRestaurantTests
{
    [Fact]
    public void Dish_can_be_added()
    {
        var restaurant = Restaurant.Create(
            "name",
            "description",
            "imageUrl",
            true);

        var dish = Dish.Create(restaurant, "name", "description", "imageUrl", 24);
        restaurant.AddDish(dish);
        var restaurantDish = restaurant.Dishes[0];

        Assert.Contains(dish, restaurant.Dishes);
        Assert.Equal(expected: "name", actual: restaurantDish.Name);
        Assert.Equal(expected: "description", actual: restaurantDish.Description);
        Assert.Equal(expected: "imageUrl", actual: restaurantDish.ImageUrl);
        Assert.Equal(expected: 24, actual: restaurantDish.Price);
    }
}