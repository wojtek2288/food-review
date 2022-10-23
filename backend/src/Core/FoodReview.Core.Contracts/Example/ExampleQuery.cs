using FoodReview.Core.Contracts.Common;

namespace FoodReview.Core.Contracts.Example;

public class ExampleQuery : QueryBase<ExampleQuery, ExampleResponseDTO>
{
    public string Name { get; set; } = default!;
}

public class ExampleResponseDTO
{
    public string Name { get; set; } = default!;
}