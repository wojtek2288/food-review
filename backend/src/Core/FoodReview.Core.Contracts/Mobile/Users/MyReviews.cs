using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[Authorize(Roles = Auth.Roles.User)]
public class MyReviews : QueryBase<MyReviews, PaginatedResult<UserReviewDTO>>
{
    public int PageCount { get; set; }
    public int PageSize { get; set; }
}

public class UserReviewDTO
{
    public DishSummaryDTO? dishReview { get; set; }
    public RestaurantSummaryDTO? restaurantReview { get; set; }
}
