using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[AllowAnonymous]
public class UserReviews : QueryBase<UserReviews, PaginatedResult<UserReviewDTO>>
{
    public Guid UserId { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
}
