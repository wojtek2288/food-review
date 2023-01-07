using System.ComponentModel;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Dishes;

public class SearchDishedQH : QueryHandler<SearchDishes, PaginatedResult<DishDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchDishedQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<DishDTO>> HandleAsync(SearchDishes query, CoreContext context)
    {
        var searchPhrase = query.SearchPhrase.ToLower();
        var dbData = dbContext.Dishes
            .Include(x => x.Restaurant)
            .Where(x => string.IsNullOrEmpty(query.RestaurantId) || x.Restaurant.Id.ToString() == query.RestaurantId)
            .Where(x => x.Name.Trim().ToLower().Contains(searchPhrase) ||
                        (x.Description != null && x.Description.Trim().ToLower().Contains(searchPhrase)) ||
                        x.Restaurant.Name.Trim().ToLower().Contains(searchPhrase));
        
        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;

        var dishes = items
            .Select(x => new DishDTO
            {
                Id = x.Id.ToString(),
                Name = x.Name,
                Description = x.Description,
                RestaurantName = x.Restaurant.Name,
                RestaurantId = x.Restaurant.Id.ToString()
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToList();

        return new PaginatedResult<DishDTO>
        {
            Items = dishes,
            TotalCount = totalCount
        };
    }
}