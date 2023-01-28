using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Admin.Statistics;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Statistics;

public class MostPopularRestaurantsQH : QueryHandler<MostPopularRestaurants, ChartSeriesItem<int>[]>
{
    private readonly CoreDbContext dbContext;

    public MostPopularRestaurantsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<ChartSeriesItem<int>[]> HandleAsync(MostPopularRestaurants command, CoreContext context)
    {
        var mostPopularNow = await dbContext.Reviews.Include(x => x.Restaurant).Select(x => x.Restaurant.Name)
            .GroupBy(x => x).Select(x => new ChartSeriesItem<int>
            {
                Name = x.Key,
                Value = x.Count()
            })
            .OrderByDescending(x => x.Value)
            .Take(5)
            .ToArrayAsync();
        return mostPopularNow;
    }
}