using FluentValidation;
using FoodReview.Core.Contracts.Admin.Dishes;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Dishes;

public class DishDetailsQV : AbstractValidator<QueryRequest<DishDetails, DishDetailsDTO>>
{
    private readonly CoreDbContext dbContext;

    public DishDetailsQV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var dishExists = await dbContext.Dishes
                    .AnyAsync(r => r.Id.ToString() == x.Query.Id, x.Context.CancellationToken);
        
                return dishExists;
            })
            .WithCode(DishDetails.ErrorCodes.DishDoesNotExist)
            .WithMessage("Dish with specified Id does not exist.");
    }
}

public class DishDetailsQH : QueryHandler<DishDetails, DishDetailsDTO>
{
    private readonly CoreDbContext dbContext;

    public DishDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<DishDetailsDTO> HandleAsync(DishDetails query, CoreContext context)
    {
        var dish = await dbContext.Dishes.Include(x => x.Restaurant)
            .SingleAsync(x => x.Id.ToString() == query.Id);

        return new DishDetailsDTO
        {
            Id = dish.Id.ToString(),
            Name = dish.Name,
            ImageUrl = dish.ImageUrl,
            Description = dish.Description,
            RestaurantName = dish.Restaurant.Name,
            RestaurantId = dish.Restaurant.Id.ToString()
        };
    }
}