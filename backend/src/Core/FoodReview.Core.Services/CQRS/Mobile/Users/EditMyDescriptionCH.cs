using FluentValidation;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Reviews;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;

namespace FoodReview.Core.Services.CQRS.Mobile.Reviews;

public class EditMyDescriptionCV : AbstractValidator<CommandRequest<EditMyDescription, Unit>>
{
    public EditMyDescriptionCV()
    {    
        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(AddReview.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.");
    }
}

public class EditMyDescriptionCH : CommandHandler<EditMyDescription>
{
    private readonly Repository<User> users;

    public EditMyDescriptionCH(Repository<User> users)
    {
        this.users = users;
    }

    public override async Task HandleAsync(EditMyDescription command, CoreContext context)
    {
        var user = await users.FindAndEnsureExistsAsync(context.UserId, context.CancellationToken);

        user.EditDescription(command.Description);
        await users.UpdateAsync(user, context.CancellationToken);
    }
}