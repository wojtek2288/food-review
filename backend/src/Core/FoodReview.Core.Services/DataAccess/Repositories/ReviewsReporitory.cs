using FoodReview.Core.Domain;

namespace FoodReview.Core.Services.DataAccess.Repositories;

public class ReviewsRepository : Repository<Review>
{
    public ReviewsRepository(CoreDbContext dbContext) : base(dbContext)
    {
    }
}
