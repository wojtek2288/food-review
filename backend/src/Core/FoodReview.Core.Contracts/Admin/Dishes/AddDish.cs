using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Dishes;

[Authorize(Roles = Auth.Roles.Admin)]
public class AddDish : CommandBase<AddDish>
{
    public string RestaurantId { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = default!;
    public decimal Price { get; set; }
    public List<string> Tags { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int RestaurantIdNotProvided = 1;
        public const int RestaurantDoesNotExist = 2;
        public const int NameIsEmpty = 3;
        public const int NameTooLong = 4;
        public const int DescriptionTooLong = 5;
        public const int ImageLinkEmpty = 6;
        public const int ImageLinkTooLong = 7;
        public const int NegativePrice = 8;
        public const int InvalidTagIdList = 9;
    }
}
