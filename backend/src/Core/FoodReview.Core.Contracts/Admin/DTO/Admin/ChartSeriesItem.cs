namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class ChartSeriesItem<T>
{
    public string Name { get; set; }
    public T Value { get; set; }
}