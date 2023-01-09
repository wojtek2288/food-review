using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Restaurants;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class RestaurantDetailsQH : QueryHandler<RestaurantDetails, RestaurantDetailsDTO?>
{
    private readonly CoreDbContext dbContext;

    public RestaurantDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override Task<RestaurantDetailsDTO?> HandleAsync(RestaurantDetails query, CoreContext context)
    {
        return dbContext.Restaurants
            .Where(r => r.Id == query.RestaurantId)
            .Select(r => new RestaurantDetailsDTO
            {
                ImageUrl = r.ImageUrl,
                RestaurantName= r.Name,
                Rating = dbContext.Reviews
                    .Where(rev => rev.Restaurant.Id == r.Id && rev.Dish == null)
                    .Average(r => r.Rating),
                Description = r.Description,
                Tags = r.Tags
                    .Join(
                        dbContext.Tags,
                        ttd => ttd.TagId,
                        t => t.Id,
                        (_, t) => new TagDTO
                        {
                            Id = t.Id,
                            Name = t.Name,
                            ColorHex = t.ColorHex,
                        })
                    .ToList(),
            })
            .FirstOrDefaultAsync(context.CancellationToken);
    }
}