using FluentValidation;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Dishes;

public class AddDishCV : AbstractValidator<CommandRequest<AddDish, Unit>>
{
    private readonly CoreDbContext dbContext;

    public AddDishCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x.Command.RestaurantId)
            .NotEmpty()
                .WithCode(AddDish.ErrorCodes.RestaurantIdNotProvided)
                .WithMessage("Restaurant ID must be provided.");
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id.ToString() == x.Command.RestaurantId, x.Context.CancellationToken);
        
                return restaurantExists;
            })
            .WithCode(AddDish.ErrorCodes.RestaurantDoesNotExist)
            .WithMessage("Restaurant with specified Id does not exist.");
        
        RuleFor(x => x.Command.Name)
            .NotEmpty()
                .WithCode(AddDish.ErrorCodes.NameIsEmpty)
                .WithMessage("Name must not be empty.")
            .MaximumLength(StringLengths.ShortString)
                .WithCode(AddDish.ErrorCodes.NameTooLong)
                .WithMessage("Name is too long.");

        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(AddDish.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.")
            .When(e => e.Command.Description is not null);

        RuleFor(x => x.Command.ImageUrl)
            .NotEmpty()
                .WithCode(AddDish.ErrorCodes.ImageLinkEmpty)
                .WithMessage("ImageLink must not be empty.")
            .MaximumLength(StringLengths.LinkString)
                .WithCode(AddDish.ErrorCodes.ImageLinkTooLong)
                .WithMessage("ImageLink too long.");
        
        RuleFor(x => x.Command.Price)
            .GreaterThan(0)
            .WithCode(AddDish.ErrorCodes.NegativePrice)
            .WithMessage("Price cannot be negative or zero");
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) =>
            {
                var tagsFound = x.Command.Tags.Distinct()
                    .Count(y => this.dbContext.Tags.SingleOrDefault(z => z.Id.ToString() == y) != null);
        
                return tagsFound == x.Command.Tags.Count;
            })
            .WithCode(AddDish.ErrorCodes.InvalidTagIdList)
            .WithMessage("Invalid list of tag IDs.");
    }
}

public class AddDishCH : CommandHandler<AddDish>
{
    private readonly CoreDbContext dbContext;

    public AddDishCH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(AddDish command, CoreContext context)
    {
        var restaurant = dbContext.Restaurants.Include(x => x.Dishes).Single(x => x.Id.ToString() == command.RestaurantId);
        var dish = Dish.Create(
            restaurant,
            command.Name,
            command.Description,
            command.ImageUrl,
            command.Price);
        dish.Tags = await dbContext.Tags.Where(x => command.Tags.Contains(x.Id.ToString())).ToListAsync();

        await dbContext.Dishes.AddAsync(dish);
        await dbContext.SaveChangesAsync();
    }
}