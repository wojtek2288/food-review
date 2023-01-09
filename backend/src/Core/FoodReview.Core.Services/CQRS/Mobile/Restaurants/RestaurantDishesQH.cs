using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Restaurants;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class RestaurantDishesQH : QueryHandler<RestaurantDishes, PaginatedResult<DishSummaryDTO>>
{
    private readonly CoreDbContext dbContext;

    public RestaurantDishesQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<DishSummaryDTO>> HandleAsync(RestaurantDishes query, CoreContext context)
    {
        var totalCount = await dbContext.Restaurants
            .Where(r => r.Id == query.RestaurantId)
            .SelectMany(r => r.Dishes)
            .CountAsync(context.CancellationToken);

        var dishes = await dbContext.Restaurants
            .Where(r => r.Id == query.RestaurantId)
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
            .OrderBy(d => d.Name)
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