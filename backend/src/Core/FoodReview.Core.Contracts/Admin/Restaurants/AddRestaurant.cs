using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[AllowAnonymous]
public class AddRestaurant : CommandBase<AddRestaurant>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int NameIsEmpty = 1;
        public const int NameTooLong = 2;
        public const int DescriptionTooLong = 3;
        public const int ImageLinkEmpty = 4;
        public const int ImageLinkTooLong = 5;
    }
}
