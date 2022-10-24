using FluentValidation;

namespace FoodReview.Core.Services.CQRS.Extensions;

public static class FluentValidatorExtensions
{
    public static IRuleBuilderOptions<T, TProperty> WithCode<T, TProperty>(
        this IRuleBuilderOptions<T, TProperty> rule,
        int code)
    {
        return rule.WithState(_ => new FluentValidatorErrorState(code));
    }
}

public sealed class FluentValidatorErrorState
{
    public int ErrorCode { get; }

    public FluentValidatorErrorState(int code)
    {
        ErrorCode = code;
    }
}
