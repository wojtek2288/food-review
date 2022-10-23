using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodReview.Core.Contracts.Common;

public abstract class CommandBase<TRequest> : Controller
    where TRequest : class
{
    [HttpPost]
    public async Task Command([FromBody]TRequest command)
    {
        var context = CoreContext.FromHttp(HttpContext);
        await MediatorHelper.Instance.Send<Unit>(new CommandRequest<TRequest, Unit>(command, context));
    }
}

public class CommandRequest<TRequest, Unit> : IRequest<Unit>
{
    public TRequest Command { get; }
    public CoreContext Context { get; }

    public CommandRequest(TRequest command, CoreContext context)
    {
        Command = command;
        Context = context;
    }
}