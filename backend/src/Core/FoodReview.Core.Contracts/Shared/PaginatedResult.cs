namespace FoodReview.Core.Contracts.Shared;

public class PaginatedResult<TResult>
{
    public List<TResult> Items { get; set; } = new();
    public long TotalCount { get; set; }
}