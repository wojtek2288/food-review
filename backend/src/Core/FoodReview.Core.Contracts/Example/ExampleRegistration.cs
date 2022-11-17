using FoodReview.Core.Contracts.Common;

namespace FoodReview.Core.Contracts.Example;

public class ExampleRegistration : CommandBase<ExampleRegistration>
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string Username { get; set; } = default!;

    public static class ErrorCodes
    {
        public const int EmailIsEmpty = 1;
        public const int PasswordIsEmpty = 2;
        public const int UsernameIsEmpty = 3;
    }
}