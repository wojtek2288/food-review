using MediatR;

namespace FoodReview.Core.Contracts.Common;

public static class MediatorHelper
{
    public static IMediator Instance { get; set; } = default!;
}