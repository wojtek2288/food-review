using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.DataAccess;

public class CoreDbContext : DbContext
{
    public CoreDbContext(DbContextOptions<CoreDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

public static class StringLengths
{
    public const int VeryShortString = 50;
    public const int ShortString = 250;
    public const int MediumString = 500;
    public const int LongString = 1000;
    public const int LinkString = 2000;
    public const int JsonString = 4000;
}
