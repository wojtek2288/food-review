using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Dishes;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class SearchDishesQH : QueryHandler<SearchDishes, PaginatedResult<DishSummaryDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchDishesQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<DishSummaryDTO>> HandleAsync(SearchDishes query, CoreContext context)
    {
        var totalCount = await dbContext.Restaurants
            .SelectMany(r => r.Dishes)
            .CountAsync(context.CancellationToken);

        var dishes = await dbContext.Restaurants
            .SelectMany(r => r.Dishes, (r, d) => new DishSummaryDTO
            {
                Id = d.Id,
                Name = d.Name,
                RestaurantName = r.Name,
                ImageUrl = d.ImageUrl,
                Rating = 5,
            })
            .Where(d => d.Name.Replace(@"\s", "").ToLower().Contains(query.SearchPhrase.Replace(@"\s", "").ToLower()))
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