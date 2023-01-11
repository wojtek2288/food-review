using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class MyReviewsQH : QueryHandler<MyReviews, PaginatedResult<MyReviewDTO>>
{
    private readonly CoreDbContext dbContext;

    public MyReviewsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<MyReviewDTO>> HandleAsync(MyReviews query, CoreContext context)
    {
        var totalCount = await dbContext.Reviews
            .Where(r => r.User.Id == context.UserId)
            .CountAsync(context.CancellationToken);

        var reviews = await dbContext.Reviews
            .Where(r => r.User.Id == context.UserId)
            .OrderByDescending(r => r.DateAdded)
            .Join(
                dbContext.Restaurants,
                r => r.Restaurant.Id,
                res => res.Id,
                (r, res) => new { Review = r, Restaurant = res })
            .LeftJoin(dbContext.Dishes, r => r.Review.Dish.Id, d => d.Id, (r, d) => new MyReviewDTO
            {
                restaurantReview = d == null
                ? new RestaurantReviewDTO
                {
                    RestaurantId = r.Restaurant.Id,
                    ReviewId = r.Review.Id,
                    Description = r.Review.Description,
                    Name = r.Restaurant.Name,
                    ImageUrl = r.Restaurant.ImageUrl,
                    Rating = r.Review.Rating,
                    Tags = r.Restaurant.Tags
                        .Join(
                            dbContext.Tags,
                            rt => rt.TagId,
                            t => t.Id,
                            (_, t) => new TagDTO
                            {
                                Id = t.Id,
                                Name = t.Name,
                                ColorHex = t.ColorHex,
                            })
                            .ToList(),
                }
                : null,
                dishReview = d != null
                ? new DishReviewDTO
                {
                    DishId = d.Id,
                    ReviewId = r.Review.Id,
                    Description = r.Review.Description,
                    Name = d.Name,
                    RestaurantName = r.Restaurant.Name,
                    ImageUrl = d.ImageUrl,
                    Rating = r.Review.Rating,
                    Tags = d.Tags
                        .Join(
                            dbContext.Tags,
                            dt => dt.TagId,
                            t => t.Id,
                            (_, t) => new TagDTO
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

        return new PaginatedResult<MyReviewDTO>
        {
            TotalCount = totalCount,
            Items = reviews,
        };
    }
}