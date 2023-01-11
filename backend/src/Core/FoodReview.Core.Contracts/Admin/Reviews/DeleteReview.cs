using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Reviews;

[Authorize(Roles = Auth.Roles.Admin)]
public class DeleteReview : CommandBase<DeleteReview>
{
    public string Id { get; set; }

    public static class ErrorCodes
    {
        public const int ReviewDoesNotExist = 1;
    }
}
