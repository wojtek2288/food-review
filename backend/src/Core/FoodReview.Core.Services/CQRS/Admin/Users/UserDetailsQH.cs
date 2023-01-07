using FluentValidation;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Admin.Users;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Users;

public class UserDetailsQV : AbstractValidator<QueryRequest<UserDetails, UserDetailsDTO>>
{
    private readonly CoreDbContext dbContext;

    public UserDetailsQV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var userExists = await dbContext.Users
                    .AnyAsync(r => r.Id.ToString() == x.Query.Id, x.Context.CancellationToken);
        
                return userExists;
            })
            .WithCode(UserDetails.ErrorCodes.UserDoesNotExist)
            .WithMessage("User with specified Id does not exist.");
    }
}

public class UserDetailsQH : QueryHandler<UserDetails, UserDetailsDTO>
{
    private readonly CoreDbContext dbContext;

    public UserDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<UserDetailsDTO> HandleAsync(UserDetails query, CoreContext context)
    {
        var user = await dbContext.Users.SingleAsync(x => x.Id.ToString() == query.Id);

        return new UserDetailsDTO
        {
            Id = user.Id.ToString(),
            Name = user.Username,
            ImageUrl = user.ImageUrl,
            Description = user.Description,
            Email = user.Email
        };
    }
}