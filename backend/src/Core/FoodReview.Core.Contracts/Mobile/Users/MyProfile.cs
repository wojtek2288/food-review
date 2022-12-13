using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[Authorize(Roles = Auth.Roles.User)]
public class MyProfile : QueryBase<MyProfile, MyProfileDTO> { }

public class MyProfileDTO
{
    public Guid UserId { get; set; }
    public string Username { get; set; } = default!;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}