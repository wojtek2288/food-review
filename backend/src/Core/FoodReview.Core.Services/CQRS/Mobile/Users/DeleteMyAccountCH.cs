using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Entities;
using FoodReview.Core.Services.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Mobile.Users;

public class DeleteMyAccountCH : CommandHandler<DeleteMyAccount>
{
    private readonly Repository<User> users;
    private readonly UserManager<AuthUser> userManager;
    private readonly CoreDbContext dbContext;

    public DeleteMyAccountCH(
        Repository<User> users,
        UserManager<AuthUser> userManager,
        CoreDbContext dbContext)
    {
        this.users = users;
        this.userManager = userManager;
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(DeleteMyAccount command, CoreContext context)
    {
        var user = await users.FindAndEnsureExistsAsync(context.UserId, context.CancellationToken);
        var authUser = await userManager.FindByIdAsync(context.UserId.ToString());
        var reviews = await dbContext.Reviews.Where(r => r.User.Id == context.UserId).ToListAsync(context.CancellationToken);

        await userManager.DeleteAsync(authUser);
        dbContext.RemoveRange(reviews);
        await users.DeleteAsync(user, context.CancellationToken);
    }
}