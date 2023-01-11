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

public class AddRestaurantCV : AbstractValidator<CommandRequest<AddRestaurant, Unit>>
{
    private readonly CoreDbContext dbContext;

    public AddRestaurantCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

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

        RuleFor(x => x.Command.ImageUrl)
            .NotEmpty()
                .WithCode(AddRestaurant.ErrorCodes.ImageLinkEmpty)
                .WithMessage("ImageLink must not be empty.")
            .MaximumLength(StringLengths.LinkString)
                .WithCode(AddRestaurant.ErrorCodes.ImageLinkTooLong)
                .WithMessage("ImageLink too long.");
                
        RuleFor(x => x)
            .Must((x, cancellation) =>
            {
                var tagsFound = x.Command.Tags.Distinct()
                    .Count(y => this.dbContext.Tags.SingleOrDefault(z => z.Id.ToString() == y) != null);
        
                return tagsFound == x.Command.Tags.Count;
            })
            .WithCode(AddRestaurant.ErrorCodes.InvalidTagIdList)
            .WithMessage("Invalid list of tag IDs.");
    }
}

public class AddRestaurantCH : CommandHandler<AddRestaurant>
{
    private readonly CoreDbContext dbContext;

    public AddRestaurantCH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task HandleAsync(AddRestaurant command, CoreContext context)
    {
        var restaurant = Restaurant.Create(
            command.Name,
            command.Description,
            command.ImageUrl,
            false);
        var tags = await dbContext.Tags.Where(x => command.Tags.Contains(x.Id.ToString())).ToListAsync();
        restaurant.Tags = tags;

        await dbContext.Restaurants.AddAsync(restaurant);
        await dbContext.SaveChangesAsync();
    }
}