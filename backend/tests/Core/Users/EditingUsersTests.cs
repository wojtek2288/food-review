using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Dishes;

public class EditingUsersTests
{
    [Fact]
    public void Users_description_can_be_edited()
    {
        var userId = Guid.NewGuid();
        var user = User.Create(userId, "username", "email@email.com");

        Assert.Null(user.Description);
        user.EditDescription("description");
        Assert.Equal(expected: "description", actual: user.Description);
    }
}