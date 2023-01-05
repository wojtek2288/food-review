using FoodReview.Core.Contracts.Admin.Restaurants;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Domain.DTO.Admin;
using Microsoft.AspNetCore.Authorization;

namespace FoodReview.Core.Contracts.Admin.Users;

[AllowAnonymous]
public class UserDetails: QueryBase<UserDetails, UserDetailsDTO>
{
    public string Id { get; set; }

    public static class ErrorCodes
    {
        public const int UserDoesNotExist = 1;
    }
}