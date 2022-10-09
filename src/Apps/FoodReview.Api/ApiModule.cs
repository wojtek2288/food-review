using FoodReview.Core.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace FoodReview.Api;

internal class ApiModule : IAppModule
{
    internal const string ApiCorsPolicy = "Api";

    private readonly IConfiguration config;
    private readonly IWebHostEnvironment hostEnv;

    public ApiModule(IConfiguration config, IWebHostEnvironment hostEnv)
    {
        this.config = config;
        this.hostEnv = hostEnv;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(ConfigureCORS);
        services.AddRouting();
    }

    private void ConfigureCORS(CorsOptions opts)
    {
        opts.AddPolicy(ApiCorsPolicy, cfg =>
        {
            cfg
                .WithOrigins(Config.Services.AllowedOrigins(config))
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
    }
}
