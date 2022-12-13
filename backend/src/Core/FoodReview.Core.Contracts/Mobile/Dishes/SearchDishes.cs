using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Dishes;

[AllowAnonymous]
public class SearchDishes : QueryBase<SearchDishes, PaginatedResult<DishSummaryDTO>>
{
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public string SearchPhrase { get; set; } = default!;
}