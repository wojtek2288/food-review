using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Dishes;

[Authorize(Roles = Auth.Roles.Admin)]
public class DeleteDish : CommandBase<DeleteDish>
{
    public string Id { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int DishDoesNotExist = 1;
    }
}
