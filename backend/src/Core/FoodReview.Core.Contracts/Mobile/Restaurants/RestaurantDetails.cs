using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Restaurants;

[AllowAnonymous]
public class RestaurantDetails : QueryBase<RestaurantDetails, RestaurantDetailsDTO?>
{
    public Guid RestaurantId { get; set; }
}

public class RestaurantDetailsDTO
{
    public string ImageUrl { get; set; } = default!;
    public string RestaurantName { get; set; } = default!;
    public double? Rating { get; set; }
    public string? Description { get; set; }
    public List<TagDTO> Tags { get; set; } = new();
}
