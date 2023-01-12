using System.ComponentModel;
using FoodReview.Core.Contracts.Admin.Reviews;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;
using ReviewDTO = FoodReview.Core.Contracts.Admin.DTO.Admin.ReviewDTO;

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
            .Where(x => string.IsNullOrEmpty(query.DishId) || x.Dish != null && x.Dish.Id.ToString() == query.DishId)
            .Where(x => string.IsNullOrEmpty(query.UserId) || x.User.Id.ToString() == query.UserId)
            .Where(x => x.Description.Trim().ToLower().Contains(searchPhrase) ||
                        x.Restaurant.Name.Trim().ToLower().Contains(searchPhrase) ||
                        x.User.Username.Trim().ToLower().Contains(searchPhrase) ||
                        (x.Dish != null && x.Dish.Name.Trim().ToLower().Contains(searchPhrase)))
            .Select(x => new
            {
                Id = x.Id,
                UserId = x.User.Id,
                Username = x.User.Username,
                Description = x.Description,
                RestaurantName = x.Restaurant.Name,
                RestaurantId = x.Restaurant.Id,
                DishId = x.Dish == null ? (Guid?)null : x.Dish.Id,
                DishName = x.Dish == null ? null : x.Dish.Name,
                Rating = x.Rating
            });
        
        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;
        
        var reviews = items
            .Select(x => new ReviewDTO
            {
                Id = x.Id.ToString(),
                UserId = x.UserId.ToString(),
                Username = x.Username,
                RestaurantId = x.RestaurantId.ToString(),
                RestaurantName = x.RestaurantName,
                DishId = x.DishId?.ToString(),
                DishName = x.DishName,
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