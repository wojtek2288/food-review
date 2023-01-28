using System.Security.Claims;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Entities;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Api;

public class Program
{
    private const string ADMIN_USERNAME = "admin";

    public static void Main(string[] args)
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false)
            .AddEnvironmentVariables()
            .Build();

        var host = CreateHostBuilder(args).Build();
        MigrateDb(host);
        AddAdminUser(host, Config.App.AdminEmail(config), Config.App.AdminPassword(config));
        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });

    private static void MigrateDb(IHost host)
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var coreDbContext = services.GetRequiredService<CoreDbContext>();
            var persistedGrantDbContext = services.GetRequiredService<PersistedGrantDbContext>();
            coreDbContext.Database.Migrate();
            persistedGrantDbContext.Database.Migrate();
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred creating the DB.");
        }
    }

    private static async void AddAdminUser(IHost host, string adminEmail, string adminPassword)
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var coreDbContext = services.GetRequiredService<CoreDbContext>();
            var userManager = services.GetRequiredService<UserManager<AuthUser>>();
            if (await coreDbContext.Users.AnyAsync(x => x.Username == ADMIN_USERNAME))
            {
                return;
            }
            
            var claim = new IdentityUserClaim<Guid>();
            claim.InitializeFromClaim(new Claim(Core.Contracts.Auth.KnownClaims.Role, Core.Contracts.Auth.Roles.Admin));
            var userId = Guid.NewGuid();

            var authUser = new AuthUser
            {
                Id = userId,
                UserName = ADMIN_USERNAME,
                Email = adminEmail,
                Claims = { claim },
            };

            var result = await userManager.CreateAsync(authUser);

            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create IdentityUser");
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(authUser);
            await userManager.ResetPasswordAsync(authUser, token, adminPassword);

            var user = User.Create(userId, ADMIN_USERNAME, adminEmail);
            await coreDbContext.Users.AddAsync(user);
            await coreDbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred creating the admin account.");
        }
    }
}
