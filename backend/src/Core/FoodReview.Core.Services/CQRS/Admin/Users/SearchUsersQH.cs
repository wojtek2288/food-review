using System.ComponentModel;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Admin.Users;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Domain;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Users;

public class SearchUsersQH : QueryHandler<SearchUsers, PaginatedResult<UserDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchUsersQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<UserDTO>> HandleAsync(SearchUsers query, CoreContext context)
    {
        var searchPhrase = query.SearchPhrase.ToLower();
        var dbData = dbContext.Users
            .Where(x => !x.IsBanned)
            .Where(x => x.Username.Trim().ToLower().Contains(searchPhrase) ||
                        (x.Description != null && x.Description.Trim().ToLower().Contains(searchPhrase)));
        
        var sortedItems = await dbData.Sort(query.SortingField, query.SortingDirection);

        var items = sortedItems.ToList();
        
        var totalCount = items.Count;

        var dishes = items
            .Select(x => new UserDTO
            {
                Id = x.Id.ToString(),
                Name = x.Username,
                Description = x.Description
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToList();

        return new PaginatedResult<UserDTO>
        {
            Items = dishes,
            TotalCount = totalCount
        };
    }
}