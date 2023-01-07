using FluentValidation;
using FoodReview.Core.Contracts.Admin.Reviews;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Reviews;

public class DeleteReviewCV : AbstractValidator<CommandRequest<DeleteReview, Unit>>
{
    private readonly CoreDbContext dbContext;

    public DeleteReviewCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(x => x)
            .MustAsync(async (x, cancellation) => 
            {
                var reviewExists = await dbContext.Reviews
                    .AnyAsync(r => r.Id.ToString() == x.Command.Id, x.Context.CancellationToken);
        
                return reviewExists;
            })
            .WithCode(DeleteReview.ErrorCodes.ReviewDoesNotExist)
            .WithMessage("Review with specified Id does not exist.");
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
        var review = await reviews.FindAndEnsureExistsAsync(Guid.Parse(command.Id), context.CancellationToken);

        await reviews.DeleteAsync(review, context.CancellationToken);
    }
}