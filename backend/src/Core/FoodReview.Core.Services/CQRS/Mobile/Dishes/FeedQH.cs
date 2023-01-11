using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Dishes;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
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
            .ConditionalWhere(
                d => d.Tags.Any(t => query.TagIds!.Contains(t.Id)),
                query.TagIds.Count > 0)
            .CountAsync(context.CancellationToken);

        var filtered = dbContext.Restaurants
            .Where(r => r.IsVisible)
            .SelectMany(r => r.Dishes, (r, d) => new DishSummaryDTO
            {
                Id = d.Id,
                Name = d.Name,
                RestaurantName = r.Name,
                ImageUrl = d.ImageUrl,
                Rating = dbContext.Reviews
                    .Where(r => r.Dish != null && r.Dish.Id == d.Id)
                    .Average(r => r.Rating),
                Tags = d.Tags
                    .Select(t => new TagDTO
                    {
                        Id = t.Id,
                        Name = t.Name,
                        ColorHex = t.ColorHex,
                    })
                    .ToList(),
            })
            .ConditionalWhere(
                d => d.Tags.Any(t => query.TagIds!.Contains(t.Id)),
                query.TagIds.Count > 0);

            var sorted = SortBy(filtered, query);

            var paginated = await sorted
                .Skip(query.PageCount * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync(context.CancellationToken);

        return new PaginatedResult<DishSummaryDTO>
        {
            TotalCount = totalCount,
            Items = paginated,
        };
    }
    private IQueryable<DishSummaryDTO> SortBy (IQueryable<DishSummaryDTO> dishes, Feed query)
    {
        return query.SortBy switch
        {
            FeedSortBy.MostPopular => dishes.OrderByDescending(
                d => dbContext.Reviews
                    .Where(r => r.Dish != null && r.Dish.Id == d.Id)
                    .Count()),
            FeedSortBy.MostRecent => dishes.OrderByDescending(
                d => dbContext.Reviews
                    .Where(r => r.DateAdded >= DateTime.Now.AddDays(-7)
                        && r.Dish != null
                        && r.Dish.Id == d.Id)
                    .Count()),
            _ => throw new InvalidOperationException("Invalid sort by"),
        };
    }
}

