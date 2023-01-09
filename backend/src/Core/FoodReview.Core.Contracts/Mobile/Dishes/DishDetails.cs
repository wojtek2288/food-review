using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Dishes;

[AllowAnonymous]
public class DishDetails : QueryBase<DishDetails, DishDetailsDTO?>
{
    public Guid DishId { get; set; }
}

public class DishDetailsDTO
{
    public Guid Id { get; set; }
    public Guid RestaurantId { get; set; }
    public string ImageUrl { get; set; } = default!;
    public string RestaurantName { get; set; } = default!;
    public string DishName { get; set; } = default!;
    public decimal Price { get; set; }
    public double? Rating { get; set; }
    public string? Description { get; set; } = default!;
    public List<TagDTO> Tags { get; set; } = new();
}
