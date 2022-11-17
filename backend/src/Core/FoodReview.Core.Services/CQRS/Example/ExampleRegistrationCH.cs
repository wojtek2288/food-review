using System.Security.Claims;
using FluentValidation;
using FoodReview.Core.Contracts;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Example;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace FoodReview.Core.Services.CQRS.Example;

public class ExampleRegistrationCH : CommandHandler<ExampleRegistration>
{
    public class ExampleRegistrationCV : AbstractValidator<CommandRequest<ExampleRegistration, Unit>>
    {
        public ExampleRegistrationCV()
        {
            RuleFor(e => e.Command.Email)
                .NotEmpty()
                .WithCode(ExampleRegistration.ErrorCodes.EmailIsEmpty)
                .WithMessage("Email must not be empty.");

            RuleFor(e => e.Command.Password)
                .NotEmpty()
                .WithCode(ExampleRegistration.ErrorCodes.PasswordIsEmpty)
                .WithMessage("Password must not be empty.");

            RuleFor(e => e.Command.Username)
                .NotEmpty()
                .WithCode(ExampleRegistration.ErrorCodes.UsernameIsEmpty)
                .WithMessage("Username must not be empty.");
        }
    }

    private readonly UserManager<AuthUser> userManager;

    public ExampleRegistrationCH(UserManager<AuthUser> userManager)
    {
        this.userManager = userManager;
    }

    public override async Task HandleAsync(ExampleRegistration command, CoreContext context)
    {
        var claim = new IdentityUserClaim<Guid>();
        claim.InitializeFromClaim(new Claim(Auth.KnownClaims.Role, Auth.Roles.User));

        var user = new AuthUser
        {
            Id = Guid.NewGuid(),
            UserName = command.Username,
            Email = command.Email,
            Claims = { claim },
        };

        var result = await userManager.CreateAsync(user);

        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Failed to create IdentityUser");
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        var resetPasswordResult = await userManager.ResetPasswordAsync(user, token, command.Password);
    }
}