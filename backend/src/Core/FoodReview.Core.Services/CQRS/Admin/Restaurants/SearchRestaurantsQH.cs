using System.ComponentModel;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;
using TagDTO = FoodReview.Core.Contracts.Admin.DTO.Admin.TagDTO;

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
            .Include(x => x.Tags)
            .Where(r => r.Name.Trim().ToLower().Contains(searchPhrase) ||
                        (r.Description != null && r.Description.Trim().ToLower().Contains(searchPhrase)));

        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;

        var restaurants = items
            .Select(x => new RestaurantDTO
            {
                Id = x.Id.ToString(),
                Name = x.Name,
                Description = x.Description,
                IsVisible = x.IsVisible,
                ImageUrl = x.ImageUrl,
                Tags = x.Tags.Select(y => new TagDTO
                {
                    Id = y.Id,
                    Name = y.Name,
                    ColorHex = y.ColorHex
                }).ToList()
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