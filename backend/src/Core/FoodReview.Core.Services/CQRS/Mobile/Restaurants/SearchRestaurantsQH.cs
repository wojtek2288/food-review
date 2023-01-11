using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Restaurants;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class SearchRestaurantsQH : QueryHandler<SearchRestaurants, PaginatedResult<RestaurantSummaryDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchRestaurantsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<RestaurantSummaryDTO>> HandleAsync(SearchRestaurants query, CoreContext context)
    {
        var totalCount = await dbContext.Restaurants
            .Where(r => r.Name.Trim().ToLower().Contains(query.SearchPhrase.Trim().ToLower())
                && r.IsVisible)
            .CountAsync(context.CancellationToken);

        var restaurants = await dbContext.Restaurants
            .Include(x => x.Tags)
            .Where(r => r.Name.Trim().ToLower().Contains(query.SearchPhrase.Trim().ToLower())
                        && r.IsVisible)
            .Select(r => new RestaurantSummaryDTO
            {
                Id = r.Id,
                Name = r.Name,
                ImageUrl = r.ImageUrl,
                Rating = dbContext.Reviews
                    .Where(rev => rev.Dish == null && rev.Restaurant.Id == r.Id)
                    .Average(r => r.Rating),
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(context.CancellationToken);

        return new PaginatedResult<RestaurantSummaryDTO>
        {
            TotalCount = totalCount,
            Items = restaurants,
        };
    }
}