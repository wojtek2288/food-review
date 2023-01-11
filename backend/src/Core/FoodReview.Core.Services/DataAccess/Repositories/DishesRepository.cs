using FoodReview.Core.Domain;

namespace FoodReview.Core.Services.DataAccess.Repositories;

public class DishesRepository : Repository<Dish>
{
    public DishesRepository(CoreDbContext dbContext) : base(dbContext)
    {
    }
}