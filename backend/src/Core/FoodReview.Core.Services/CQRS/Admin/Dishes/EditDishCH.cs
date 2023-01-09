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

public class EditDishCV : AbstractValidator<CommandRequest<EditDish, Unit>>
{
    private readonly CoreDbContext dbContext;

    public EditDishCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var dishExists = await dbContext.Dishes
                    .AnyAsync(r => r.Id.ToString() == x.Command.Id, x.Context.CancellationToken);
        
                return dishExists;
            })
            .WithCode(EditDish.ErrorCodes.DishDoesNotExist)
            .WithMessage("Dish with specified Id does not exist.");

        RuleFor(x => x.Command.Name)
            .NotEmpty()
                .WithCode(EditDish.ErrorCodes.NameIsEmpty)
                .WithMessage("Name must not be empty.")
            .MaximumLength(StringLengths.ShortString)
                .WithCode(EditDish.ErrorCodes.NameTooLong)
                .WithMessage("Name is too long.");

        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(EditDish.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.")
            .When(e => e.Command.Description is not null);

        RuleFor(x => x.Command.ImageUrl)
            .NotEmpty()
                .WithCode(EditDish.ErrorCodes.ImageLinkEmpty)
                .WithMessage("ImageLink must not be empty.")
            .MaximumLength(StringLengths.LinkString)
                .WithCode(EditDish.ErrorCodes.ImageLinkTooLong)
                .WithMessage("ImageLink too long.");
        
        RuleFor(x => x.Command.Price)
            .GreaterThan(0)
            .WithCode(EditDish.ErrorCodes.NegativePrice)
            .WithMessage("Price cannot be negative or zero");
    }
}

public class EditDishCH : CommandHandler<EditDish>
{
    private readonly Repository<Dish> dishes;

    public EditDishCH(Repository<Dish> dishes)
    {
        this.dishes = dishes;
    }

    public override async Task HandleAsync(EditDish command, CoreContext context)
    {
        var dish = await dishes.FindAndEnsureExistsAsync(Guid.Parse(command.Id));
        
        dish.Edit(command.Name,
            command.Description,
            command.ImageUrl,
            command.Price);
        await dishes.SaveChangesAsync();
    }
}