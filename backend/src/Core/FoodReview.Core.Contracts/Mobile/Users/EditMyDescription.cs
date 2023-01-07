using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[Authorize(Roles = Auth.Roles.User)]
public class EditMyDescription : CommandBase<EditMyDescription>
{
    public string Description { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int DescriptionTooLong = 1;
    }
}
