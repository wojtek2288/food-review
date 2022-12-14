using Xunit;
using FoodReview.Core.Domain;

namespace FoodReview.Tests.Core.Dishes;

public class EditingDishesTests
{
    [Fact]
    public void Dish_can_be_edited()
    {
        var restaurant = Restaurant.Create(
            "name",
            "description",
            "imageUrl",
            true);

        var dish = Dish.Create(restaurant, "name", "description", "imageUrl", 24);
        restaurant.AddDish(dish);
        restaurant.EditDish(dish.Id, "edited name", "edited description", "edited imageUrl", 28);
        var restaurantDish = restaurant.Dishes[0];

        Assert.Contains(dish, restaurant.Dishes);
        Assert.Equal(expected: "edited name", actual: restaurantDish.Name);
        Assert.Equal(expected: "edited description", actual: restaurantDish.Description);
        Assert.Equal(expected: "edited imageUrl", actual: restaurantDish.ImageUrl);
        Assert.Equal(expected: 28, actual: restaurantDish.Price);
    }
}