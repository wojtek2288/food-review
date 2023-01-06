using FluentValidation;
using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Restaurants;

public class RestaurantDetailsQV : AbstractValidator<QueryRequest<RestaurantDetails, RestaurantDetailsDTO>>
{
    private readonly CoreDbContext dbContext;

    public RestaurantDetailsQV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
        
        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var restaurantExists = await dbContext.Restaurants
                    .AnyAsync(r => r.Id.ToString() == x.Query.Id, x.Context.CancellationToken);
        
                return restaurantExists;
            })
            .WithCode(RestaurantDetails.ErrorCodes.RestaurantDoesNotExist)
            .WithMessage("Restaurant with specified Id does not exist.");
    }
}

public class RestaurantDetailsQH : QueryHandler<RestaurantDetails, RestaurantDetailsDTO>
{
    private readonly CoreDbContext dbContext;

    public RestaurantDetailsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override async Task<RestaurantDetailsDTO> HandleAsync(RestaurantDetails query, CoreContext context)
    {
        var restaurant = await dbContext.Restaurants.SingleAsync(x => x.Id.ToString() == query.Id);

        return new RestaurantDetailsDTO
        {
            Id = restaurant.Id.ToString(),
            Name = restaurant.Name,
            ImageUrl = restaurant.ImageUrl,
            Description = restaurant.Description,
            IsVisible = restaurant.IsVisible
        };
    }
}