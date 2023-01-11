using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Dishes;

[AllowAnonymous]
public class DishDetails: QueryBase<DishDetails, DishDetailsDTO>
{
    public string Id { get; set; }

    public static class ErrorCodes
    {
        public const int DishDoesNotExist = 1;
    }
}