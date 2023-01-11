using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Common;
using FoodReview.Core.Contracts.Shared;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Example;

public class TagsQH : QueryHandler<Tags, List<TagDTO>>
{
    private readonly CoreDbContext dbContext;

    public TagsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override Task<List<TagDTO>> HandleAsync(Tags query, CoreContext context)
    {
        return dbContext.Tags
            .OrderBy(t => t.Name)
            .Select(t => new TagDTO
            {
                Id = t.Id,
                Name = t.Name,
                ColorHex = t.ColorHex,
            })
            .ToListAsync(context.CancellationToken);
    }
}