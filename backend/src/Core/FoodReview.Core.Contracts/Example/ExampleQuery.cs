using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Example;

[Authorize(Roles = Auth.Roles.User)]
public class ExampleQuery : QueryBase<ExampleQuery, ExampleResponseDTO>
{
    public string Name { get; set; } = default!;
}

public class ExampleResponseDTO
{
    public Guid MyUserId { get; set; } = default!;
}