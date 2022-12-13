using FoodReview.Core.Contracts.Common;

namespace FoodReview.Core.Contracts.Mobile.Users;

public class Register : CommandBase<Register>
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string Username { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int EmailIsEmpty = 1;
        public const int EmailIsTaken = 2;
        public const int PasswordIsEmpty = 3;
        public const int PasswordTooShort = 4;
        public const int UsernameIsEmpty = 5;
        public const int UsernameIsTaken = 6;
    }
}