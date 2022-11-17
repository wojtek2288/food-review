using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Example;

[Authorize(Roles = Auth.Roles.User)]
public class ExampleCommand : CommandBase<ExampleCommand>
{
    public string Name { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int NameIsEmpty = 1;
    }
}