using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodReview.Core.Contracts.Common;

public abstract class QueryBase<TRequest, TResponse> : Controller
    where TRequest : class
    where TResponse : class?
{
    [HttpGet("api/[action]/[namespace].[controller]")]
    public async Task<TResponse> Query([FromBody]TRequest query)
    {
        var context = CoreContext.FromHttp(HttpContext);
        return await MediatorHelper.Instance.Send<TResponse>(new QueryRequest<TRequest, TResponse>(query, context));
    }
}

public class QueryRequest<TRequest, TResponse> : IRequest<TResponse>
{
    public TRequest Query { get; }
    public CoreContext Context { get; }

    public QueryRequest(TRequest query, CoreContext context)
    {
        Query = query;
        Context = context;
    }
}