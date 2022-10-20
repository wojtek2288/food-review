using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Entities;
using ListN.Core.Services.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodReview.Core.Services;

public class CoreModule : IAppModule
{
    private readonly string connectionString;

    public CoreModule(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<CoreDbContext>(
            opts => opts.UseSqlServer(connectionString));

        services
            .AddIdentity<AuthUser, AuthRole>()
            .AddEntityFrameworkStores<CoreDbContext>()
            .AddDefaultTokenProviders();

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
