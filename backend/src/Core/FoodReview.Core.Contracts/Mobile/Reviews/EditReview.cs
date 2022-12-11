using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Reviews;

[Authorize(Roles = Auth.Roles.User)]
public class EditReview : CommandBase<EditReview>
{
    public Guid ReviewId { get; set; }
    public string Description { get; set; } = default!;
    public double Rating { get; set; }

    public static class ErrorCodes
    {
        public const int ReviewWithSpecifiedIdDoesNotExist = 1;
        public const int UserDoesNotOwnTheReview = 2;
        public const int DescriptionTooLong = 3;
        public const int RatingIsInvalid = 4;
    }
}
