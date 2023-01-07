using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[AllowAnonymous]
public class DeleteRestaurant : CommandBase<DeleteRestaurant>
{
    public string Id { get; set; }

    public static class ErrorCodes
    {
        public const int RestaurantDoesNotExist = 1;
    }
}
