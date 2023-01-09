using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[AllowAnonymous]
public class EditRestaurant : CommandBase<EditRestaurant>
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int RestaurantDoesNotExist = 1;
        public const int NameIsEmpty = 2;
        public const int NameTooLong = 3;
        public const int DescriptionTooLong = 4;
        public const int ImageLinkEmpty = 5;
        public const int ImageLinkTooLong = 6;
    }
}
