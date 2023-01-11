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
            .Where(r => r.IsVisible)
            .SelectMany(r => r.Dishes)
            .Where(d => d.Name.Replace(@"\s", "").ToLower().Contains(query.SearchPhrase.Replace(@"\s", "").ToLower()))
            .CountAsync(context.CancellationToken);

        var dishes = await dbContext.Restaurants
            .Include(x => x.Tags)
            .Where(r => r.IsVisible)
            .SelectMany(r => r.Dishes, (r, d) => new DishSummaryDTO
            {
                Id = d.Id,
                Name = d.Name,
                RestaurantName = r.Name,
                ImageUrl = d.ImageUrl,
                Rating = dbContext.Reviews
                    .Where(r => r.Dish.Id != null && r.Dish.Id == d.Id)
                    .Average(r => r.Rating),
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