using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Restaurants;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class RestaurantReviewsQH : QueryHandler<RestaurantReviews, PaginatedResult<ReviewDTO>>
{
    private readonly CoreDbContext dbContext;

    public RestaurantReviewsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<ReviewDTO>> HandleAsync(RestaurantReviews query, CoreContext context)
    {
        var totalCount = await dbContext.Reviews
            .Where(r => r.RestaurantId == query.RestaurantId && r.DishId == null)
            .CountAsync(context.CancellationToken);

        var reviews = await dbContext.Reviews
            .Where(r => r.RestaurantId == query.RestaurantId && r.DishId == null)
            .OrderByDescending(r => r.DateAdded)
            .Join(dbContext.Users, r => r.UserId, u => u.Id, (r, u) => new ReviewDTO
            {
                Id = r.Id,
                ImageUrl = u.ImageUrl,
                Username = u.Username,
                Description = r.Description,
                Rating = r.Rating,
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(context.CancellationToken);

        return new PaginatedResult<ReviewDTO>
        {
            TotalCount = totalCount,
            Items = reviews,
        };
    }
}