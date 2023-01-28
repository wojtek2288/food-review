using FoodReview.Core.Contracts.Admin.DTO.Admin;
using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Statistics;

[Authorize(Roles = Auth.Roles.Admin)]
public class MostPopularRestaurants : QueryBase<MostPopularRestaurants, ChartSeriesItem<int>[]>
{
    
}