using FluentValidation;
using FoodReview.Core.Contracts.Admin;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Example;

public class AddRestaurantCV : AbstractValidator<CommandRequest<AddRestaurant, Unit>>
{
    public AddRestaurantCV()
    {
        RuleFor(x => x.Command.Name)
            .NotEmpty()
                .WithCode(AddRestaurant.ErrorCodes.NameIsEmpty)
                .WithMessage("Name must not be empty.")
            .MaximumLength(StringLengths.ShortString)
                .WithCode(AddRestaurant.ErrorCodes.NameTooLong)
                .WithMessage("Name is too long.");

        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.ShortString)
                .WithCode(AddRestaurant.ErrorCodes.NameTooLong)
                .WithMessage("Name is too long.")
            .When(e => e.Command.Description is not null);
    }
}

public class AddRestaurantCH : CommandHandler<AddRestaurant>
{
    public readonly Repository<Restaurant> restaurants;

    public AddRestaurantCH(Repository<Restaurant> restaurants)
    {
        this.restaurants = restaurants;
    }

    public override async Task HandleAsync(AddRestaurant command, CoreContext context)
    {
        var restaurant = Restaurant.Create(command.Name, command.Description, command.IsVisible);

        await restaurants.AddAsync(restaurant, context.CancellationToken);
    }
}