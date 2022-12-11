using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Reviews;

[Authorize(Roles = Auth.Roles.User)]
public class AddReview : CommandBase<AddReview>
{
    public Guid RestaurantId { get; set; }
    public Guid? DishId { get; set; }
    public string Description { get; set; } = default!;
    public double Rating { get; set; }

    public static class ErrorCodes
    {
        public const int RestaurantWithSpecifiedIdDoesNotExist = 1;
        public const int DishWithSpecifiedIdDoesNotExist = 2;
        public const int DescriptionTooLong = 3;
        public const int RatingIsInvalid = 4;
    }
}
