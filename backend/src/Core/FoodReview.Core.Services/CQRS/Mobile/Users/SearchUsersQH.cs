using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class SearchUsersQH : QueryHandler<SearchUsers, PaginatedResult<UserSummaryDTO>>
{
    private readonly CoreDbContext dbContext;

    public SearchUsersQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<PaginatedResult<UserSummaryDTO>> HandleAsync(SearchUsers query, CoreContext context)
    {
        var totalCount = await dbContext.Users
            .Where(r => r.Username.Trim().ToLower().Contains(query.SearchPhrase.Trim().ToLower()))
            .CountAsync(context.CancellationToken);

        var users = await dbContext.Users
            .Where(u => u.Username.Trim().ToLower().Contains(query.SearchPhrase.Trim().ToLower()))
            .Select(u => new UserSummaryDTO
            {
                Id = u.Id,
                Username = u.Username,
                Description = u.Description,
                ImageUrl = u.ImageUrl,
            })
            .Skip(query.PageCount * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(context.CancellationToken);

        return new PaginatedResult<UserSummaryDTO>
        {
            TotalCount = totalCount,
            Items = users,
        };
    }
}