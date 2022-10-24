using FoodReview.Core.Contracts.Common;

namespace FoodReview.Core.Contracts.Example;

public class ExampleCommand : CommandBase<ExampleCommand>
{
    public string Name { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int NameIsEmpty = 1;
    }
}