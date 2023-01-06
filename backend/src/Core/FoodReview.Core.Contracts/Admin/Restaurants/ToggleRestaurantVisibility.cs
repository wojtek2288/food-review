using FoodReview.Core.Contracts.Common;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

public class ToggleRestaurantVisibility: CommandBase<ToggleRestaurantVisibility>
{
    public string Id { get; set; }
    
    public static class ErrorCodes
    {
        public const int RestaurantDoesNotExist = 1;
    }
}