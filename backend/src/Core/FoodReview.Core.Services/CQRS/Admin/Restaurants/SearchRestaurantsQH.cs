using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Restaurants;

public class SearchRestaurantsQH : QueryHandler<SearchRestaurants, PaginatedResult<RestaurantDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchRestaurantsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<RestaurantDTO>> HandleAsync(SearchRestaurants query, CoreContext context)
    {
        var items = await dbContext.Restaurants.Select(r => new RestaurantDTO
        {
            Id = r.Id.ToString(),
            Name = r.Name,
            Description = r.Description,
        }).ToListAsync(context.CancellationToken);
        var pag = new PaginatedResult<RestaurantDTO>
        {
            Items = items,
            TotalCount = items.Count
        };
        return pag;
    }
}