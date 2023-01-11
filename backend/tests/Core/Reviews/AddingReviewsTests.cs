using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Reviews;

public class AddingReviewsTests
{
    [Fact]
    public void Review_can_be_added()
    {
        var user = User.Create(Guid.NewGuid(), "test", "test@test.com");
        var restaurant = Restaurant.Create("testRestaurant", null, "", true);
        var dish = Dish.Create(restaurant, "testDish", null, "", 10);

        var review = Review.Create(user, restaurant, dish, "description", 5.6);

        Assert.Equal(expected: user, actual: review.User);
        Assert.Equal(expected: restaurant, actual: review.Restaurant);
        Assert.Equal(expected: dish, actual: review.Dish);
        Assert.Equal(expected: "description", actual: review.Description);
        Assert.Equal(expected: 5.6, actual: review.Rating);
    }

    [Fact]
    public void Review_throws_when_rating_is_invalid()
    {
        var user = User.Create(Guid.NewGuid(), "test", "test@test.com");
        var restaurant = Restaurant.Create("testRestaurant", null, "", true);
        var dish = Dish.Create(restaurant, "testDish", null, "", 10);

        Assert.Throws<InvalidOperationException>(() => Review.Create(
            user,
            restaurant,
            dish,
            "description",
            11.6));
        Assert.Throws<InvalidOperationException>(() => Review.Create(
            user,
            restaurant,
            dish,
            "description",
            0.3));
    }
}