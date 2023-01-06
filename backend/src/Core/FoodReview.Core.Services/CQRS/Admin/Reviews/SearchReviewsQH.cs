using System.ComponentModel;
using FoodReview.Core.Contracts.Admin.Reviews;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
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
        var dbData = dbContext.Reviews.Select(x => new ReviewDTO
            {
                Id = x.Id.ToString(),
                UserId = x.UserId.ToString(),
                Username = dbContext.Users.Single(y => y.Id == x.UserId).Username,
                Description = x.Description,
                Rating = x.Rating,
                RestaurantId = x.RestaurantId.ToString(),
                DishId = x.DishId.ToString(),
                RestaurantName = dbContext.Restaurants.Single(y => y.Id == x.RestaurantId).Name,
                DishName = x.DishId != null ? dbContext.Dishes.Single(y => y.Id == x.DishId).Name : null,
            })
            .Where(x => string.IsNullOrEmpty(query.RestaurantId) || x.RestaurantId == query.RestaurantId)
            .Where(x => string.IsNullOrEmpty(query.DishId) || x.DishId == query.DishId)
            .Where(x => x.Description.Trim().ToLower().Contains(searchPhrase) ||
                        x.RestaurantName.Trim().ToLower().Contains(searchPhrase) ||
                        (x.DishName != null && x.DishName.Trim().ToLower().Contains(searchPhrase)));
        
        IEnumerable<ReviewDTO> items = dbData;
        if (query.SortingField != null)
        {
            var descriptor = TypeDescriptor.GetProperties(typeof(ReviewDTO)).Find(query.SortingField, true);
            var list = await dbData.ToListAsync();
            items = query.SortingDirection != null && query.SortingDirection == "asc" ? list.OrderBy(x => descriptor.GetValue(x)) 
                : list.OrderByDescending(x => descriptor.GetValue((x)));
        }
        
        var totalCount = items.Count();

        var reviews = items
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