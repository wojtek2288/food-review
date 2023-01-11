using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain.DTO.Admin;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Restaurants;

public class SearchRestaurants : QueryBase<SearchRestaurants, PaginatedResult<RestaurantDTO>>
{
    public string? SortingField { get; set; }
    public string? SortingDirection { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public string SearchPhrase { get; set; } = default!;
}