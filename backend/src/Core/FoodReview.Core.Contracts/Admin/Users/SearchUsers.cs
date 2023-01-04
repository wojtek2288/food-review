using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Shared;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Users;

[AllowAnonymous]
public class SearchUsers: QueryBase<SearchUsers, PaginatedResult<UserDTO>>
{
    public string? SortingField { get; set; }
    public string? SortingDirection { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public string SearchPhrase { get; set; } = default!;
}