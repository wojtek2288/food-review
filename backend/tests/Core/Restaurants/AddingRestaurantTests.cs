using Xunit;
using FoodReview.Core.Domain;

namespace FoodReview.Tests.Core.Restaurants;

public class AddingRestaurantTests
{
    [Fact]
    public void Restaurant_can_be_added()
    {
        var restaurant = Restaurant.Create(
            "name",
            "description",
            "imageUrl",
            true);

        Assert.Equal(expected: "name", actual: restaurant.Name);
        Assert.Equal(expected: "description", actual: restaurant.Description);
        Assert.Equal(expected: "imageUrl", actual: restaurant.ImageUrl);
        Assert.True(restaurant.IsVisible);
    }
}