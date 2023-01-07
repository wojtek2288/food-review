using FluentValidation;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Restaurants;

public class DeleteRestaurantCV : AbstractValidator<CommandRequest<DeleteRestaurant, Unit>>
{
    private readonly CoreDbContext dbContext;

    public DeleteRestaurantCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id.ToString() == x.Command.Id, x.Context.CancellationToken);
        
                return restaurantExists;
            })
            .WithCode(DeleteRestaurant.ErrorCodes.RestaurantDoesNotExist)
            .WithMessage("Restaurant with specified Id does not exist.");
    }
}

public class DeleteRestaurantCH : CommandHandler<DeleteRestaurant>
{
    private readonly Repository<Restaurant> restaurants;

    public DeleteRestaurantCH(Repository<Restaurant> restaurants)
    {
        this.restaurants = restaurants;
    }

    public override async Task HandleAsync(DeleteRestaurant command, CoreContext context)
    {
        var review = await restaurants.FindAndEnsureExistsAsync(Guid.Parse(command.Id), context.CancellationToken);

        await restaurants.DeleteAsync(review, context.CancellationToken);
    }
}