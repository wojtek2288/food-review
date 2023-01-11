using FluentValidation;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Reviews;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Mobile.Reviews;

public class AddReviewCV : AbstractValidator<CommandRequest<AddReview, Unit>>
{
    private readonly CoreDbContext dbContext;

    public AddReviewCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x.Command.RestaurantId)
            .MustAsync(async (restaurantId, ct) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id == restaurantId, ct);

                return restaurantExists;
            })
            .WithCode(AddReview.ErrorCodes.RestaurantWithSpecifiedIdDoesNotExist)
            .WithMessage("Restaurant with specified Id does not exist.");

        RuleFor(x => x)
            .MustAsync(async (cmd, ct) =>
            {
                if (cmd.Command.DishId != null)
                {
                    return !(await dbContext.Reviews
                        .Where(r => r.Dish != null)
                        .AnyAsync(r => r.User.Id == cmd.Context.UserId
                            && r.Dish!.Id == cmd.Command.DishId));
                }
                else
                {
                    return !(await dbContext.Reviews
                        .AnyAsync(r => r.User.Id == cmd.Context.UserId
                            && r.Restaurant.Id == cmd.Command.RestaurantId));
                }
            })
            .WithCode(AddReview.ErrorCodes.UserAlreadyRated)
            .WithMessage("This has already been rated.");

        RuleFor(x => x.Command.DishId)
            .MustAsync(async (dishId, ct) => 
            {
                var dishExists = await dbContext.Restaurants
                    .SelectMany(r => r.Dishes)
                    .AnyAsync(d => d.Id == dishId, ct);

                return dishExists;
            })
            .WithCode(AddReview.ErrorCodes.DishWithSpecifiedIdDoesNotExist)
            .WithMessage("Dish with specified Id does not exist.")
            .When(x => x.Command.DishId is not null);
            
        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(AddReview.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.")
            .When(x => x.Command.Description is not null);

        RuleFor(x => x.Command.Rating)
            .Must(r => r >= 1 && r <= 10)
                .WithCode(AddReview.ErrorCodes.RatingIsInvalid)
                .WithMessage("Rating has to be within 1-10 range.");
    }
}

public class AddReviewCH : CommandHandler<AddReview>
{
    private readonly CoreDbContext dbContext;

    public AddReviewCH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(AddReview command, CoreContext context)
    {
        var user = await dbContext.Users.FirstAsync(u => u.Id == context.UserId, context.CancellationToken);
        var restaurant = await dbContext.Restaurants.FirstAsync(r => r.Id == command.RestaurantId, context.CancellationToken);
        var dish = command.DishId != null
            ? await dbContext.Dishes.FirstAsync(d => d.Id == command.DishId.Value)
            : null;

        var review = Review.Create(
            user,
            restaurant,
            dish,
            command.Description,
            command.Rating);

        await dbContext.AddAsync(review);
        await dbContext.SaveChangesAsync(context.CancellationToken);
    }
}