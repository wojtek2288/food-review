using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Reviews;

public class AddingReviewsTests
{
    [Fact]
    public void Review_can_be_added()
    {
        var userId = Guid.NewGuid();
        var restaurantId = Guid.NewGuid();
        var dishId = Guid.NewGuid();

        var review = Review.Create(userId, restaurantId, dishId, "description", 5.6);

        Assert.Equal(expected: userId, actual: review.UserId);
        Assert.Equal(expected: restaurantId, actual: review.RestaurantId);
        Assert.Equal(expected: dishId, actual: review.DishId);
        Assert.Equal(expected: "description", actual: review.Description);
        Assert.Equal(expected: 5.6, actual: review.Rating);
    }

    [Fact]
    public void Review_throws_when_rating_is_invalid()
    {
        Assert.Throws<InvalidOperationException>(() => Review.Create(
            Guid.NewGuid(),
            Guid.NewGuid(),
            Guid.NewGuid(),
            "description",
            11.6));
        Assert.Throws<InvalidOperationException>(() => Review.Create(
            Guid.NewGuid(),
            Guid.NewGuid(),
            Guid.NewGuid(),
            "description",
            0.3));
    }
}