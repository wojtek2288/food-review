using FoodReview.Core.Contracts.Common;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Common;

public abstract class QueryHandler<TRequest, TResponse> : IRequestHandler<QueryRequest<TRequest, TResponse>, TResponse>
{
    public async Task<TResponse> Handle(QueryRequest<TRequest, TResponse> request, CancellationToken cancellationToken)
    {
        return await HandleAsync(request.Query, request.Context);
    }

    public abstract Task<TResponse> HandleAsync(TRequest query, CoreContext context);
}