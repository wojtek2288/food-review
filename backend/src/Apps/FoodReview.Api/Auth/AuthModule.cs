using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using FoodReview.Core.Services;
using FoodReview.Core.Services.DataAccess.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using AuthConsts = FoodReview.Core.Contracts.Auth;

namespace FoodReview.Api.Auth;

public class AuthModule : IAppModule
{
    private readonly IWebHostEnvironment hostEnv;
    private readonly IConfiguration config;

    public AuthModule(IConfiguration config, IWebHostEnvironment hostEnv)
    {
        this.hostEnv = hostEnv;
        this.config = config;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = Config.SqlServer.ConnectionString(config);

        var isConfig = services.AddIdentityServer()
            .AddInMemoryApiResources(ClientsConfiguration.GetApiResources())
            .AddInMemoryIdentityResources(ClientsConfiguration.GetIdentityResources())
            .AddInMemoryClients(ClientsConfiguration.GetClients())
            .AddInMemoryApiScopes(ClientsConfiguration.GetApiScopes())
            .AddOperationalStore(options =>
            {
                options.DefaultSchema = "auth";
                options.ConfigureDbContext = b => b
                    .UseSqlServer(
                        connectionString,
                        sql => sql.MigrationsAssembly("FoodReview.Core.Services"));
            })
            .AddAspNetIdentity<AuthUser>();

        if (hostEnv.IsDevelopment())
        {
            isConfig = isConfig.AddDeveloperSigningCredential();
        }
        else
        {
            isConfig = isConfig.AddSigningCredential(CreateSigningCredential());
        }

        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

        services.AddAuthentication(
            options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(cfg =>
            {
                cfg.Authority = Config.Services.Auth.Address(config);
                cfg.TokenValidationParameters.ValidateAudience = true;
                cfg.TokenValidationParameters.ValidateIssuer = true;
                cfg.TokenValidationParameters.ValidAudience = AuthConsts.Scopes.InternalApi;
                cfg.TokenValidationParameters.ValidIssuer = Config.Services.Auth.Address(config);
                cfg.RequireHttpsMetadata = false;

                cfg.TokenValidationParameters.RoleClaimType = AuthConsts.KnownClaims.Role;
                cfg.TokenValidationParameters.NameClaimType = AuthConsts.KnownClaims.UserId;
            });
    }

    private SigningCredentials CreateSigningCredential()
    {
        var rsaCrpytoServiceProvider = new RSACryptoServiceProvider(2048);
        var securityKey = new RsaSecurityKey(rsaCrpytoServiceProvider);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha512);

        return credentials;
    }
}

