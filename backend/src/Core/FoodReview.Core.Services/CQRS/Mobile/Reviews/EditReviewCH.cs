using FluentValidation;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Reviews;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Mobile.Reviews;

public class EditReviewCV : AbstractValidator<CommandRequest<EditReview, Unit>>
{
    private readonly CoreDbContext dbContext;

    public EditReviewCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x.Command.ReviewId)
            .MustAsync(async (reviewId, ct) => 
            {
                var reviewExists = await dbContext.Reviews
                    .AnyAsync(r => r.Id == reviewId, ct);

                return reviewExists;
            })
            .WithCode(EditReview.ErrorCodes.ReviewWithSpecifiedIdDoesNotExist)
            .WithMessage("Review with specified Id does not exist.");

        RuleFor(x => x)
            .MustAsync(async (cmd, ct) => 
            {
                var review = await dbContext.Reviews
                    .Where(r => r.Id == cmd.Command.ReviewId)
                    .Select(r => new 
                    {
                        r.UserId
                    })
                    .FirstOrDefaultAsync(ct);

                return review is null || review.UserId == cmd.Context.UserId;
            })
            .WithCode(EditReview.ErrorCodes.UserDoesNotOwnTheReview)
            .WithMessage("User does not own the review.");
            
        RuleFor(x => x.Command.Description)
            .MaximumLength(StringLengths.MediumString)
                .WithCode(AddReview.ErrorCodes.DescriptionTooLong)
                .WithMessage("Description is too long.");

        RuleFor(x => x.Command.Rating)
            .Must(r => r >= 1 && r <= 10)
                .WithCode(AddReview.ErrorCodes.RatingIsInvalid)
                .WithMessage("Rating has to be within 1-10 range.");
    }
}

public class EditReviewCH : CommandHandler<EditReview>
{
    private readonly Repository<Review> reviews;

    public EditReviewCH(Repository<Review> reviews)
    {
        this.reviews = reviews;
    }

    public override async Task HandleAsync(EditReview command, CoreContext context)
    {
        var review = await reviews.FindAndEnsureExistsAsync(command.ReviewId, context.CancellationToken);

        review.Edit(command.Description, command.Rating);
        await reviews.UpdateAsync(review, context.CancellationToken);
    }
}