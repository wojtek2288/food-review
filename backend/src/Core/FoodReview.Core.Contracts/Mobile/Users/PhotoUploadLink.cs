using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[Authorize(Roles = Auth.Roles.User)]
public class PhotoUploadLink : QueryBase<PhotoUploadLink, string>
{
    public string Extension { get; set; } = default!;
}