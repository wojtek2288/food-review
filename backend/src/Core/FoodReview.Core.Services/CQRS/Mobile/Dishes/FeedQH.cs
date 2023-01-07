using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Dishes;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class FeedQH : QueryHandler<Feed, PaginatedResult<DishSummaryDTO>>
{
    private readonly CoreDbContext dbContext;

    public FeedQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<DishSummaryDTO>> HandleAsync(Feed query, CoreContext context)
    {
        var totalCount = await dbContext.Restaurants
            .Where(r => r.IsVisible)
            .SelectMany(r => r.Dishes)
            .CountAsync(context.CancellationToken);

        var dishes = await dbContext.Restaurants
            .Where(r => r.IsVisible)
            .SelectMany(r => r.Dishes, (r, d) => new DishSummaryDTO
            {
                Id = d.Id,
                Name = d.Name,
                RestaurantName = r.Name,
                ImageUrl = d.ImageUrl,
                Rating = dbContext.Reviews
                    .Where(r => r.Dish.Id == d.Id)
                    .Average(r => r.Rating),
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(context.CancellationToken);

        return new PaginatedResult<DishSummaryDTO>
        {
            TotalCount = totalCount,
            Items = dishes,
        };
    }
}