using Microsoft.Extensions.DependencyInjection;

namespace FoodReview.Core.Services;

public interface IAppModule
{
    void ConfigureServices(IServiceCollection services);
}
