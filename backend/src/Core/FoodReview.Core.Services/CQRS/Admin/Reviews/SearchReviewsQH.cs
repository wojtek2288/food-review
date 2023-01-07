using System.ComponentModel;
using FoodReview.Core.Contracts.Admin.Reviews;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Reviews;

public class SearchReviewsQH : QueryHandler<SearchReviews, PaginatedResult<ReviewDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchReviewsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<ReviewDTO>> HandleAsync(SearchReviews query, CoreContext context)
    {
        var searchPhrase = query.SearchPhrase.ToLower();
        var dbData = dbContext.Reviews
            .Include(x => x.User)
            .Include(x => x.Restaurant)
            .Include(x => x.Dish)
            .Where(x => !x.User.IsBanned)
            .Where(x => string.IsNullOrEmpty(query.RestaurantId) || x.Restaurant.Id.ToString() == query.RestaurantId)
            .Where(x => string.IsNullOrEmpty(query.DishId) || x.Dish == null || x.Dish.Id.ToString() == query.DishId)
            .Where(x => string.IsNullOrEmpty(query.UserId) || x.User.Id.ToString() == query.UserId)
            .Where(x => x.Description.Trim().ToLower().Contains(searchPhrase) ||
                        x.Restaurant.Name.Trim().ToLower().Contains(searchPhrase) ||
                        (x.Dish != null && x.Dish.Name.Trim().ToLower().Contains(searchPhrase)));
        
        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;
        
        var reviews = items
            .Select(x => new ReviewDTO
            {
                Id = x.Id.ToString(),
                UserId = x.User.Id.ToString(),
                Username = x.User.Username,
                RestaurantId = x.Restaurant.Id.ToString(),
                RestaurantName = x.Restaurant.Name,
                DishId = x.Dish?.Id.ToString(),
                DishName = x.Dish?.Name,
                Description = x.Description,
                Rating = x.Rating
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToList();
        
        return new PaginatedResult<ReviewDTO>
        {
            Items = reviews,
            TotalCount = totalCount
        };
    }
}