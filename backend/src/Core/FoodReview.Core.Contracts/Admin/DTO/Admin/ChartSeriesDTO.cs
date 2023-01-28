using FoodReview.Core.Contracts.Admin.Statistics;

namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class ChartSeriesDTO<T>
{
    public string Name { get; set; }
    public ChartSeriesItem<T>[] Series { get; set; }
}