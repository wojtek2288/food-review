using FoodReview.Api.Auth;
using FoodReview.Api.Extensions;
using FoodReview.Core.Services;

namespace FoodReview.Api;

public class Startup
{
    private IConfiguration Configuration { get; }
    private IWebHostEnvironment HostEnv { get; }
    private IAppModule[] Modules { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment hostEnv)
    {
        Configuration = configuration;
        HostEnv = hostEnv;
        Modules = ConfigureModules(hostEnv, configuration);
    }

    protected static IAppModule[] ConfigureModules(IWebHostEnvironment hostEnv, IConfiguration config)
    {
        var dbConnStr = Config.SqlServer.ConnectionString(config);

        return new IAppModule[]
        {
            new ApiModule(config, hostEnv),
            new CoreModule(dbConnStr),
            new AuthModule(config, hostEnv),
        };
    }

    public void ConfigureServices(IServiceCollection services)
    {
        foreach(var module in Modules)
        {
            module.ConfigureServices(services);
        }
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app
            .UseRouting()
            .UseAuthentication()
            .UseCors(ApiModule.ApiCorsPolicy)
            .UseFluentValidationExceptionHandler()
            .UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{action}/{namespace}.{controller}");
            });

        app.Map("/auth", auth => auth.UseIdentityServer());
    }
}

