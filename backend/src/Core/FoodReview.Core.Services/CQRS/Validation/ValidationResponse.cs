namespace FoodReview.Core.Services.CQRS.Validation;

public class ValidationResponse
{
    public string PropertyName { get; set; } = default!;
    public string ErrorMessage { get; set; } = default!;
    public int? ErrorCode { get; set; }
}