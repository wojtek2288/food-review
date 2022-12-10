using FoodReview.Core.Domain;

namespace FoodReview.Core.Services.DataAccess.Repositories;

public class UsersRepository : Repository<User>
{
    public UsersRepository(CoreDbContext dbContext) : base(dbContext)
    {
    }
}