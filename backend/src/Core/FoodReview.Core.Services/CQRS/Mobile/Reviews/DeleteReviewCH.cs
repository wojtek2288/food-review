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

public class DeleteReviewCV : AbstractValidator<CommandRequest<DeleteReview, Unit>>
{
    private readonly CoreDbContext dbContext;

    public DeleteReviewCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x.Command.ReviewId)
            .MustAsync(async (reviewId, ct) => 
            {
                var reviewExists = await dbContext.Reviews
                    .AnyAsync(r => r.Id == reviewId, ct);

                return reviewExists;
            })
            .WithCode(DeleteReview.ErrorCodes.ReviewWithSpecifiedIdDoesNotExist)
            .WithMessage("Review with specified Id does not exist.");

        RuleFor(x => x)
            .MustAsync(async (cmd, ct) => 
            {
                var review = await dbContext.Reviews
                    .Where(r => r.Id == cmd.Command.ReviewId)
                    .Select(r => new 
                    {
                        UserId = r.User.Id
                    })
                    .FirstOrDefaultAsync(ct);

                return review is null || review.UserId == cmd.Context.UserId;
            })
            .WithCode(DeleteReview.ErrorCodes.UserDoesNotOwnTheReview)
            .WithMessage("User does not own the review.");
    }
}

public class DeleteReviewCH : CommandHandler<DeleteReview>
{
    private readonly Repository<Review> reviews;

    public DeleteReviewCH(Repository<Review> reviews)
    {
        this.reviews = reviews;
    }

    public override async Task HandleAsync(DeleteReview command, CoreContext context)
    {
        var review = await reviews.FindAndEnsureExistsAsync(command.ReviewId, context.CancellationToken);

        await reviews.DeleteAsync(review, context.CancellationToken);
    }
}