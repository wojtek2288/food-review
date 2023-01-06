using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Dishes;

[AllowAnonymous]
public class DishReviews : QueryBase<DishReviews, PaginatedResult<ReviewDTO>>
{
    public Guid DishId { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
}
