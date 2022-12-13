using FluentValidation;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Validation;

public class ValidationBahavior<TRequest, Unit> : IPipelineBehavior<TRequest, Unit>
    where TRequest : IRequest<Unit>
{
    private readonly IEnumerable<IValidator<TRequest>> validators;

    public ValidationBahavior(IEnumerable<IValidator<TRequest>> validators)
    {
        this.validators = validators;
    }

    public async Task<Unit> Handle(TRequest request, RequestHandlerDelegate<Unit> next, CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);

        var validationTasks = validators.Select(x => x.ValidateAsync(context));
        var results = await Task.WhenAll(validationTasks);
        var failures = results.SelectMany(x => x.Errors).Where(x => x is not null).ToList();

        if (failures.Any())
        {
            throw new ValidationException(failures);
        }

        return await next();
    }
}