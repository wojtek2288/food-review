using FluentValidation;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Dishes;

public class DeleteDishCV : AbstractValidator<CommandRequest<DeleteDish, Unit>>
{
    private readonly CoreDbContext dbContext;

    public DeleteDishCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var dishExists = await dbContext.Dishes
                    .AnyAsync(r => r.Id.ToString() == x.Command.Id, x.Context.CancellationToken);
        
                return dishExists;
            })
            .WithCode(DeleteDish.ErrorCodes.DishDoesNotExist)
            .WithMessage("Dish with specified Id does not exist.");
    }
}

public class DeleteDishCH : CommandHandler<DeleteDish>
{
    private readonly Repository<Dish> dishes;

    public DeleteDishCH(Repository<Dish> dishes)
    {
        this.dishes = dishes;
    }

    public override async Task HandleAsync(DeleteDish command, CoreContext context)
    {
        var dish = await dishes.FindAndEnsureExistsAsync(Guid.Parse(command.Id), context.CancellationToken);

        await dishes.DeleteAsync(dish, context.CancellationToken);
    }
}