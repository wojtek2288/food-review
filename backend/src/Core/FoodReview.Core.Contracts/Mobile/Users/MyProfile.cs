using FoodReview.Core.Contracts.Common;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Mobile.Users;

[Authorize(Roles = Auth.Roles.User)]
public class MyProfile : QueryBase<MyProfile, UserDetailsDTO>
{
}