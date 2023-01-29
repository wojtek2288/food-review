using FluentValidation;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Restaurants;

public class ToggleRestuarantVisibilityCV : AbstractValidator<CommandRequest<ToggleRestaurantVisibility, Unit>>
{
    private readonly CoreDbContext dbContext;

    public ToggleRestuarantVisibilityCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id.ToString() == x.Command.Id, x.Context.CancellationToken);
        
                return restaurantExists;
            })
            .WithCode(ToggleRestaurantVisibility.ErrorCodes.RestaurantDoesNotExist)
            .WithMessage("Restaurant with specified Id does not exist.");
    }
}

public class ToggleRestaurantVisibilityCH : CommandHandler<ToggleRestaurantVisibility>
{
    private readonly CoreDbContext dbContext;

    public ToggleRestaurantVisibilityCH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(ToggleRestaurantVisibility command, CoreContext context)
    {
        var restaurant = await dbContext.Restaurants.SingleAsync(x => x.Id.ToString() == command.Id);

        restaurant.ChangeVisibility(!restaurant.IsVisible);
        await dbContext.SaveChangesAsync();
    }
}