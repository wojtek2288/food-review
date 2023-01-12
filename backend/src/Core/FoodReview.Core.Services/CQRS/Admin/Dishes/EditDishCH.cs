using FluentValidation;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
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
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) =>
            {
                var tagsFound = x.Command.Tags.Distinct()
                    .Count(y => this.dbContext.Tags.SingleOrDefault(z => z.Id.ToString() == y) != null);
        
                return tagsFound == x.Command.Tags.Count;
            })
            .WithCode(EditDish.ErrorCodes.InvalidTagIdList)
            .WithMessage("Invalid list of tag IDs.");
    }
}

public class EditDishCH : CommandHandler<EditDish>
{
    private readonly CoreDbContext dbContext;

    public EditDishCH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(EditDish command, CoreContext context)
    {
        var dish = await dbContext.Dishes.Include(x => x.Tags).SingleAsync(x => x.Id == Guid.Parse(command.Id));
        
        dish.Edit(command.Name,
            command.Description,
            command.ImageUrl,
            command.Price);
        var tags = await dbContext.Tags.Where(x => command.Tags.Contains(x.Id.ToString())).ToListAsync();
        dish.Tags = tags;

        await dbContext.SaveChangesAsync();
    }
}