using FoodReview.Core.Domain;
using FoodReview.Core.Services.DataAccess.Entities;
using ListN.Core.Services.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.DataAccess;

public class CoreDbContext : IdentityDbContext<AuthUser, AuthRole, Guid>
{
    public CoreDbContext(DbContextOptions<CoreDbContext> options)
        : base(options)
    { }

    public DbSet<Restaurant> Restaurants => Set<Restaurant>();
    public DbSet<Dish> Dishes => Set<Dish>();
    public new DbSet<User> Users => Set<User>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Tag> Tags => Set<Tag>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        ConfigureAuth(builder);

        builder.Entity<Restaurant>(cfg =>
        {
            cfg.HasKey(e => e.Id);
            cfg.Property(e => e.Name).IsRequired();
            cfg.Property(e => e.Name).HasMaxLength(StringLengths.ShortString);
            cfg.Property(e => e.Description).HasMaxLength(StringLengths.MediumString);
            cfg.Property(e => e.ImageUrl).HasMaxLength(StringLengths.LinkString);
            cfg.HasMany(e => e.Dishes).WithOne(e => e.Restaurant);
            // cfg.OwnsMany(e => e.Tags, t =>
            // {
            //     t.HasKey(t => new { t.RestaurantId, t.TagId });
            // });
        });

        builder.Entity<Dish>(cfg =>
        {
            cfg.HasKey(e => e.Id);
            cfg.Property(e => e.Name).IsRequired();
            cfg.Property(e => e.Name).HasMaxLength(StringLengths.ShortString);
            cfg.Property(e => e.Description).HasMaxLength(StringLengths.MediumString);
            cfg.Property(e => e.ImageUrl).HasMaxLength(StringLengths.LinkString);
            // cfg.OwnsMany(e => e.Tags, t =>
            // {
            //     t.HasKey(t => new { t.DishId, t.TagId });
            // });
        });

        builder.Entity<User>(cfg =>
        {
            cfg.HasKey(e => e.Id);
            cfg.Property(e => e.Username).IsRequired();
            cfg.Property(e => e.Username).HasMaxLength(StringLengths.VeryShortString);
            cfg.Property(e => e.Description).HasMaxLength(StringLengths.MediumString);
            cfg.Property(e => e.Email).IsRequired();
            cfg.Property(e => e.Email).HasMaxLength(StringLengths.ShortString);
            cfg.Property(e => e.ImageUrl).HasMaxLength(StringLengths.LinkString);
        });

        builder.Entity<Review>(cfg =>
        {
            cfg.HasKey(e => e.Id);
            // cfg.HasOne<User>().WithMany().HasForeignKey(e => e.UserId);
            // cfg.HasOne<Restaurant>().WithMany().HasForeignKey(e => e.RestaurantId);
            // cfg.HasOne<Dish>().WithMany().HasForeignKey(e => e.DishId);
            cfg.Property(e => e.Description).IsRequired();
            cfg.Property(e => e.Description).HasMaxLength(StringLengths.MediumString);
        });

        builder.Entity<Tag>(cfg =>
        {
            cfg.HasKey(e => e.Id);
            cfg.Property(e => e.Name).HasMaxLength(StringLengths.VeryShortString);
            cfg.Property(e => e.ColorHex).HasMaxLength(StringLengths.VeryShortString);
        });
    }

    private static void ConfigureAuth(ModelBuilder builder)
    {
        builder.Entity<AuthUser>(b =>
        {
            b.HasMany(u => u.Claims)
                .WithOne()
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.UserId);
            b.ToTable("AspNetUsers", "auth");
        });

        builder.Entity<AuthRole>(b => b.ToTable("AspNetRoles", "auth"));
        builder.Entity<IdentityUserClaim<Guid>>(b => b.ToTable("AspNetUserClaims", "auth"));
        builder.Entity<IdentityRoleClaim<Guid>>(b => b.ToTable("AspNetRoleClaims", "auth"));
        builder.Entity<IdentityUserRole<Guid>>(b => b.ToTable("AspNetUserRoles", "auth"));
        builder.Entity<IdentityUserLogin<Guid>>(b => b.ToTable("AspNetUserLogins", "auth"));
        builder.Entity<IdentityUserToken<Guid>>(b => b.ToTable("AspNetUserTokens", "auth"));
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
