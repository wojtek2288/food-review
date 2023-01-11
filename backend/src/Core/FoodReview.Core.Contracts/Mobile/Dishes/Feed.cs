using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Dishes;

[AllowAnonymous]
public class Feed : QueryBase<Feed, PaginatedResult<DishSummaryDTO>>
{
    public int PageCount { get; set; }
    public int PageSize { get; set; }
    public FeedSortBy SortBy { get; set; }
    public List<Guid> TagIds { get; set; } = default!;
}

public enum FeedSortBy
{
    MostPopular = 0,
    MostRecent = 1,
}
