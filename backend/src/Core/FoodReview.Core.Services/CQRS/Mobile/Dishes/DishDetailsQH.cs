using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Dishes;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class DishDetailsQH : QueryHandler<DishDetails, DishDetailsDTO?>
{
    private readonly CoreDbContext dbContext;

    public DishDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override Task<DishDetailsDTO?> HandleAsync(DishDetails query, CoreContext context)
    {
        return dbContext.Dishes
            .Include(x => x.Tags)
            .Where(d => d.Id == query.DishId)
            .Select(d => new DishDetailsDTO
            {
                Id = d.Id,
                ImageUrl = d.ImageUrl,
                RestaurantId = d.Restaurant.Id,
                RestaurantName= d.Restaurant.Name,
                DishName = d.Name,
                Price = d.Price,
                Rating = dbContext.Reviews
                    .Where(r => r.Dish != null && r.Dish.Id == d.Id)
                    .Average(r => r.Rating),
                Description = d.Description,
                Tags = d.Tags.Select(x => new TagDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                    ColorHex = x.ColorHex
                }).ToList()
            })
            .FirstOrDefaultAsync(context.CancellationToken);
    }
}