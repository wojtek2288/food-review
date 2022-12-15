using Xunit;
using FoodReview.Core.Domain;
using System;

namespace FoodReview.Tests.Core.Users;

public class AddingUsersTests
{
    [Fact]
    public void Users_can_be_added()
    {
        var userId = Guid.NewGuid();
        var user = User.Create(userId, "username", "email@email.com");

        Assert.Equal(expected: userId, actual: user.Id);
        Assert.Equal(expected: "username", actual: user.Username);
        Assert.Equal(expected: "email@email.com", actual: user.Email);
    }
}