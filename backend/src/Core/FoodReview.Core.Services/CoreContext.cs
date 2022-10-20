using System.Security.Claims;
using FoodReview.Core.Contracts;
using Microsoft.AspNetCore.Http;

namespace FoodReview.Core.Services;

public class CoreContext
{
    public ClaimsPrincipal User { get; }
    public Guid UserId { get; }

    public CancellationToken CancellationToken { get; }

    private CoreContext(ClaimsPrincipal user, CancellationToken cancellationToken)
    {
        User = user;
        CancellationToken = cancellationToken;

        UserId = ParseUserClaim(user, Auth.KnownClaims.UserId);
    }

    public static CoreContext FromHttp(HttpContext httpContext)
    {
        return new CoreContext(httpContext.User, httpContext.RequestAborted);
    }

    private static Guid ParseUserClaim(ClaimsPrincipal? user, string claimType)
    {
        if (user?.Identity?.IsAuthenticated ?? false)
        {
            var str = user.FindFirstValue(claimType);
            _ = Guid.TryParse(str, out var res);
            return res;
        }
        else
        {
            return Guid.Empty;
        }
    }
}
