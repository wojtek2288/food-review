using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[Authorize(Roles = Auth.Roles.Admin)]
public class DeleteRestaurant : CommandBase<DeleteRestaurant>
{
    public string Id { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int RestaurantDoesNotExist = 1;
    }
}
