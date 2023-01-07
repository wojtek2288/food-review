using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Reviews;

public class EditingReviewsTests
{
    [Fact]
    public void Review_can_be_edited()
    {
        var user = User.Create(Guid.NewGuid(), "test", "test@test.com");
        var restaurant = Restaurant.Create("testRestaurant", null, "", true);
        var dish = Dish.Create(restaurant, "testDish", null, "", 10);

        var review = Review.Create(user, restaurant, dish, "description", 5.6);
        review.Edit("edited description", 7.5);

        Assert.Equal(expected: "edited description", actual: review.Description);
        Assert.Equal(expected: 7.5, actual: review.Rating);
    }

    [Fact]
    public void Review_throws_when_rating_is_invalid()
    {
        var user = User.Create(Guid.NewGuid(), "test", "test@test.com");
        var restaurant = Restaurant.Create("testRestaurant", null, "", true);
        var dish = Dish.Create(restaurant, "testDish", null, "", 10);

        var review = Review.Create(user, restaurant, dish, "description", 5.6);

        Assert.Throws<InvalidOperationException>(() => review.Edit("edited description", 11.4));
        Assert.Throws<InvalidOperationException>(() => review.Edit("edited description", 0.4));
    }
}