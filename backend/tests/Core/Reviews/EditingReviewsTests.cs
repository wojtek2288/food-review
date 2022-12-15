using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Reviews;

public class EditingReviewsTests
{
    [Fact]
    public void Review_can_be_edited()
    {
        var userId = Guid.NewGuid();
        var restaurantId = Guid.NewGuid();
        var dishId = Guid.NewGuid();

        var review = Review.Create(userId, restaurantId, dishId, "description", 5.6);
        review.Edit("edited description", 7.5);

        Assert.Equal(expected: "edited description", actual: review.Description);
        Assert.Equal(expected: 7.5, actual: review.Rating);
    }

    [Fact]
    public void Review_throws_when_rating_is_invalid()
    {
        var review = Review.Create(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), "description", 5.6);

        Assert.Throws<InvalidOperationException>(() => review.Edit("edited description", 11.4));
        Assert.Throws<InvalidOperationException>(() => review.Edit("edited description", 0.4));
    }
}