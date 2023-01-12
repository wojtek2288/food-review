using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Entities;
using ListN.Core.Services.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using FoodReview.Core.Services.DataAccess.Repositories;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.Configuration;

namespace FoodReview.Core.Services;

public class CoreModule : IAppModule
{
    private readonly string connectionString;
    private readonly string blobConnectionString;

    public CoreModule(string connectionString, string blobConnectionString)
    {
        this.connectionString = connectionString;
        this.blobConnectionString = blobConnectionString;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<CoreDbContext>(
            opts => opts.UseSqlServer(connectionString),
            ServiceLifetime.Transient);

        services.AddSingleton<BlobStorageConfiguration>(
            new BlobStorageConfiguration
            {
                ConnectionString = blobConnectionString,
            });
        services.AddSingleton<BlobStorage>();

        services
            .AddIdentity<AuthUser, AuthRole>()
            .AddEntityFrameworkStores<CoreDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<Repository<Restaurant>, RestaurantsRepository>();
        services.AddScoped<Repository<Dish>, DishesRepository>();
        services.AddScoped<Repository<User>, UsersRepository>();
        services.AddScoped<Repository<Review>, ReviewsRepository>();

        services.Configure<IdentityOptions>(options =>
        {
            options.User.AllowedUserNameCharacters = @"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.""(),:;<>@[\] ";
            options.Password.RequiredLength = 1;
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        });
    }
}
