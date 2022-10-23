using FluentValidation;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Example;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Example;

public class ExampleCommandCH : CommandHandler<ExampleCommand>
{
    public class ExampleCommandCV : AbstractValidator<CommandRequest<ExampleCommand, Unit>>
    {
        public ExampleCommandCV()
        {
            RuleFor(e => e.Command.Name)
                .NotEmpty()
                .WithCode(ExampleCommand.ErrorCodes.NameIsEmpty)
                .WithMessage("Name must not be empty.");
        }
    }

    public override Task HandleAsync(ExampleCommand command, CoreContext context)
    {
        return Task.CompletedTask;
    }
}