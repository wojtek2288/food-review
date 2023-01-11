using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Common;

[AllowAnonymous]
public class Tags : QueryBase<Tags, List<TagDTO>> { }

