using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin;

[Authorize(Roles = Auth.Roles.Admin)]
public class AddRestaurant : CommandBase<AddRestaurant>
{
    public string Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public bool IsVisible { get; set; }
    public string ImageLink { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int RestaurantWithSpecifiedIdAlreadyExists = 1;
        public const int NameIsEmpty = 2;
        public const int NameTooLong = 3;
        public const int DescriptionTooLong = 4;
        public const int ImageLinkEmpty = 5;
        public const int ImageLinkTooLong = 6;
    }
}
