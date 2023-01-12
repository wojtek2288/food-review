using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class UserReviewsQH : QueryHandler<UserReviews, PaginatedResult<UserReviewDTO>>
{
    private readonly CoreDbContext dbContext;

    public UserReviewsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<UserReviewDTO>> HandleAsync(UserReviews query, CoreContext context)
    {
        var totalCount = await dbContext.Reviews
            .Where(r => r.User.Id == query.UserId)
            .CountAsync(context.CancellationToken);

        var reviews = await dbContext.Reviews
            .Where(r => r.User.Id == query.UserId && r.Restaurant.IsVisible)
            .Join(
                dbContext.Restaurants,
                r => r.Restaurant.Id,
                res => res.Id,
                (r, res) => new { Review = r, Restaurant = res })
            .LeftJoin(
                dbContext.Dishes,
                r => r.Review.Dish == null
                    ? null
                    : r.Review.Dish.Id,
                d => (Guid?)d.Id, (r, d) => new UserReviewDTO
            {
                restaurantReview = d == null
                ? new RestaurantSummaryDTO
                {
                    Id = r.Restaurant.Id,
                    Name = r.Restaurant.Name,
                    ImageUrl = r.Restaurant.ImageUrl,
                    Rating = r.Review.Rating,
                    Tags = r.Restaurant.Tags
                        .Select(t => new TagDTO
                        {
                            Id = t.Id,
                            Name = t.Name,
                            ColorHex = t.ColorHex,
                        })
                        .ToList(),
                }
                : null,
                dishReview = d != null
                ? new DishSummaryDTO
                {
                    Id = d.Id,
                    Name = d.Name,
                    RestaurantName = r.Restaurant.Name,
                    ImageUrl = d.ImageUrl,
                    Rating = r.Review.Rating,
                    Tags = d.Tags
                        .Select(t => new TagDTO
                        {
                            Id = t.Id,
                            Name = t.Name,
                            ColorHex = t.ColorHex,
                        })
                        .ToList(),
                }
                : null,
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(context.CancellationToken);

        return new PaginatedResult<UserReviewDTO>
        {
            TotalCount = totalCount,
            Items = reviews,
        };
    }
}