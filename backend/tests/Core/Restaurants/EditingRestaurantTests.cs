using Xunit;
using FoodReview.Core.Domain;

namespace FoodReview.Tests.Core.Restaurants;

public class EditingRestaurantTests
{
    [Fact]
    public void Restaurant_can_be_edited()
    {
        var restaurant = Restaurant.Create(
            "name",
            "description",
            "imageUrl",
            true);

        restaurant.Edit("edited name", "edited description", "edited imageUrl");
        restaurant.ChangeVisibility(false);

        Assert.Equal(expected: "edited name", actual: restaurant.Name);
        Assert.Equal(expected: "edited description", actual: restaurant.Description);
        Assert.Equal(expected: "edited imageUrl", actual: restaurant.ImageUrl);
        Assert.False(restaurant.IsVisible);
    }
}