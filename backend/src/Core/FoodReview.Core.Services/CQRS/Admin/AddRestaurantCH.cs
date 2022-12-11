using FluentValidation;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class AddRestaurantCV : AbstractValidator<CommandRequest<AddRestaurant, Unit>>
{
    private readonly CoreDbContext dbContext;

    public AddRestaurantCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id == x.Command.Id, x.Context.CancellationToken);

                return !restaurantExists;
            })
            .WithCode(AddRestaurant.ErrorCodes.RestaurantWithSpecifiedIdAlreadyExists)
            .WithMessage("Restaurant with specified Id already exists.");

        RuleFor(x => x.Command.Name)
            .NotEmpty()
                .WithCode(AddRestaurant.ErrorCodes.NameIsEmpty)
                .WithMessage("Name must not be empty.")
            .MaximumLength(StringLengths.ShortString)
                .WithCode(AddRestaurant.ErrorCodes.NameTooLong)
                .WithMessage("Name is too long.");

        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(AddRestaurant.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.")
            .When(e => e.Command.Description is not null);

        RuleFor(x => x.Command.ImageLink)
            .NotEmpty()
                .WithCode(AddRestaurant.ErrorCodes.ImageLinkEmpty)
                .WithMessage("ImageLink must not be empty.")
            .MaximumLength(StringLengths.LinkString)
                .WithCode(AddRestaurant.ErrorCodes.ImageLinkTooLong)
                .WithMessage("ImageLink too long.");
    }
}

public class AddRestaurantCH : CommandHandler<AddRestaurant>
{
    private readonly Repository<Restaurant> restaurants;

    public AddRestaurantCH(Repository<Restaurant> restaurants)
    {
        this.restaurants = restaurants;
    }

    public override async Task HandleAsync(AddRestaurant command, CoreContext context)
    {
        var restaurant = Restaurant.Create(
            command.Name,
            command.Description,
            command.ImageLink,
            command.IsVisible);

        await restaurants.AddAsync(restaurant, context.CancellationToken);
    }
}