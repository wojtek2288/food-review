using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Dishes;

[AllowAnonymous]
public class SearchDishes: QueryBase<SearchDishes, PaginatedResult<DishDTO>>
{
    public string? SortingField { get; set; }
    public string? SortingDirection { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public string SearchPhrase { get; set; } = default!;
}
