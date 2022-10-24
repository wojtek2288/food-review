using FoodReview.Core.Contracts.Common;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Common;

public abstract class CommandHandler<TRequest> : IRequestHandler<CommandRequest<TRequest, Unit>, Unit>
{
    public async Task<Unit> Handle(CommandRequest<TRequest, Unit> request, CancellationToken cancellationToken)
    {
        await HandleAsync(request.Command, request.Context);
        return Unit.Value;
    }

    public abstract Task HandleAsync(TRequest command, CoreContext context);
}