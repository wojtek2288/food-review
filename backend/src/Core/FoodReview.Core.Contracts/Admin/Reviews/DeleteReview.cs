using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Reviews;

[AllowAnonymous]
public class DeleteReview : CommandBase<DeleteReview>
{
    public string Id { get; set; }

    public static class ErrorCodes
    {
        public const int ReviewDoesNotExist = 1;
    }
}
