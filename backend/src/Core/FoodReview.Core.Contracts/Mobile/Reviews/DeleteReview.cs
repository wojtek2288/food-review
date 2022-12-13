using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Reviews;

[Authorize(Roles = Auth.Roles.User)]
public class DeleteReview : CommandBase<DeleteReview>
{
    public Guid ReviewId { get; set; }

    public static class ErrorCodes
    {
        public const int ReviewWithSpecifiedIdDoesNotExist = 1;
        public const int UserDoesNotOwnTheReview = 2;
    }
}
