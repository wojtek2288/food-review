using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FoodReview.Core.Services.DataAccess;

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
    }
}
