using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

[AllowAnonymous]
public class SearchRestaurants : QueryBase<SearchRestaurants, PaginatedResult<RestaurantDTO>>
{
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public string SearchPhrase { get; set; } = default!;
}