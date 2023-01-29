using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Tags;

[Authorize(Roles = Auth.Roles.Admin)]
public class GetTags: QueryBase<GetTags, List<TagDTO>>
{
}