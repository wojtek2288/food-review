using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[AllowAnonymous]
public class UserDetails : QueryBase<UserDetails, UserDetailsDTO?>
{
    public Guid UserId { get; set; }
}

public class UserDetailsDTO
{
    public string? ImageUrl { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string? Description { get; set; } = default!;
}
