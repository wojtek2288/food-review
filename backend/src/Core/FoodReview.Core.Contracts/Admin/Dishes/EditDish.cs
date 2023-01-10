using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Dishes;

[AllowAnonymous]
public class EditDish : CommandBase<EditDish>
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string ImageUrl { get; set; } = default!;
    public decimal Price { get; set; }
    public List<string> Tags { get; set; }

    public static class ErrorCodes
    {
        public const int DishDoesNotExist = 1;
        public const int NameIsEmpty = 2;
        public const int NameTooLong = 3;
        public const int DescriptionTooLong = 4;
        public const int ImageLinkEmpty = 5;
        public const int ImageLinkTooLong = 6;
        public const int NegativePrice = 7;
        public const int InvalidTagIdList = 8;
    }
}
