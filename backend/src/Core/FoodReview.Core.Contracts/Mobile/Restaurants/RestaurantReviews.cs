using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Restaurants;

[AllowAnonymous]
public class RestaurantReviews : QueryBase<RestaurantReviews, PaginatedResult<ReviewDTO>>
{
    public Guid RestaurantId { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
}
