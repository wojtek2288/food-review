using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class UserDetailsQH : QueryHandler<UserDetails, UserDetailsDTO?>
{
    private readonly CoreDbContext dbContext;

    public UserDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override Task<UserDetailsDTO?> HandleAsync(UserDetails query, CoreContext context)
    {
        return dbContext.Users
            .Where(u => u.Id == query.UserId)
            .Select(u => new UserDetailsDTO
            {
                ImageUrl = u.ImageUrl,
                Description = u.Description,
                Username = u.Username,
            })
            .FirstOrDefaultAsync(context.CancellationToken);
    }
}