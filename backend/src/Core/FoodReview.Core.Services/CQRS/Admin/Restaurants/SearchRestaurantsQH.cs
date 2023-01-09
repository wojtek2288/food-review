using System.ComponentModel;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
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
        var searchPhrase = query.SearchPhrase.ToLower();
        var dbData = dbContext.Restaurants
            .Where(r => r.Name.Trim().ToLower().Contains(searchPhrase) ||
                        (r.Description != null && r.Description.Trim().ToLower().Contains(searchPhrase)));

        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;

        var restaurants = items
            .Select(r => new RestaurantDTO
            {
                Id = r.Id.ToString(),
                Name = r.Name,
                Description = r.Description,
                IsVisible = r.IsVisible,
                ImageUrl = r.ImageUrl
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToList();

        return new PaginatedResult<RestaurantDTO>
        {
            Items = restaurants,
            TotalCount = totalCount
        };
    }
}