using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Example;
using FoodReview.Core.Services.CQRS.Common;

namespace FoodReview.Core.Services.CQRS.Example;

public class ExampleQueryQH : QueryHandler<ExampleQuery, ExampleResponseDTO>
{
    public override Task<ExampleResponseDTO> HandleAsync(ExampleQuery query, CoreContext context)
    {
        return Task.FromResult(new ExampleResponseDTO
        {
            Name = "test1234",
        });
    }
}