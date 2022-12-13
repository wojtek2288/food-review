using FoodReview.Core.Domain.Common;

namespace FoodReview.Core.Domain;

public class User : IAggregateRoot
{
    public Guid Id { get; private init; }
    public string Username { get; private set; } = default!;
    public string? Description { get; private set; }
    public string Email { get; private set; } = default!;
    public string? ImageUrl { get; private set; }

    private User() { }

    public static User Create(
        Guid id,
        string username,
        string email)
    {
        return new User
        {
            Id = id,
            Username = username,
            Email = email,
        };
    }
}