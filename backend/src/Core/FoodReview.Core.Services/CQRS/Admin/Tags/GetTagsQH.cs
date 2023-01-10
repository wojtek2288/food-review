using FoodReview.Core.Contracts.Admin.Tags;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain.DTO.Admin;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Admin.Tags;

public class GetTagsQH: QueryHandler<GetTags, List<TagDTO>>
{
    private readonly CoreDbContext dbContext;

    public GetTagsQH(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public override Task<List<TagDTO>> HandleAsync(GetTags query, CoreContext context)
    {
        return dbContext.Tags.Select(x => new TagDTO
        {
            Id = x.Id,
            Name = x.Name,
            ColorHex = x.ColorHex
        }).ToListAsync();
    }
}