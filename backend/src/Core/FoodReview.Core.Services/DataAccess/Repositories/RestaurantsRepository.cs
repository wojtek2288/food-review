using FoodReview.Core.Domain;

namespace FoodReview.Core.Services.DataAccess.Repositories;

public class RestaurantsRepository : Repository<Restaurant>
{
    public RestaurantsRepository(CoreDbContext dbContext) : base(dbContext)
    {
    }
}