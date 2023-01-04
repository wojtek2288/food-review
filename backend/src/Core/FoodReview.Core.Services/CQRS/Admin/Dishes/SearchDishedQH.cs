using System.ComponentModel;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
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
            .Where(x => x.Name.Trim().ToLower().Contains(searchPhrase) ||
                        (x.Description != null && x.Description.Trim().ToLower().Contains(searchPhrase)) ||
                        x.Restaurant.Name.Trim().ToLower().Contains(searchPhrase));
        
        IEnumerable<Dish> items = dbData;
        if (query.SortingField != null)
        {
            var descriptor = TypeDescriptor.GetProperties(typeof(Dish)).Find(query.SortingField, true);
            var list = await dbData.ToListAsync();
            items = query.SortingDirection != null && query.SortingDirection == "asc" ? list.OrderBy(x => descriptor.GetValue(x)) 
                : list.OrderByDescending(x => descriptor.GetValue((x)));
        }
        
        var totalCount = items.Count();

        var dishes = items
            .Select(x => new DishDTO
            {
                Id = x.Id.ToString(),
                Name = x.Name,
                Description = x.Description,
                RestaurantName = x.Restaurant.Name
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