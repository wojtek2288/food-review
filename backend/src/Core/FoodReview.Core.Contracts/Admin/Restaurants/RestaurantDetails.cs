using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[Authorize(Roles = Auth.Roles.Admin)]
public class RestaurantDetails: QueryBase<RestaurantDetails, RestaurantDetailsDTO>
{
    public string Id { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int RestaurantDoesNotExist = 1;
    }
}