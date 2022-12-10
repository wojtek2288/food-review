using System.Security.Claims;
using FluentValidation;
using FoodReview.Core.Contracts;
using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.DataAccess;
using FoodReview.Core.Services.DataAccess.Entities;
using FoodReview.Core.Services.DataAccess.Repositories;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Mobile.Users;

public class RegisterCV : AbstractValidator<CommandRequest<Register, Unit>>
{
    private readonly CoreDbContext dbContext;

    public RegisterCV(CoreDbContext dbContext)
    {
        this.dbContext = dbContext;

        RuleFor(e => e.Command.Email)
            .NotEmpty()
                .WithCode(Register.ErrorCodes.EmailIsEmpty)
                .WithMessage("Email must not be empty.")
            .MustAsync(async (email, ct) => 
            {
                var userWithEmailExists = await dbContext.Users
                    .AnyAsync(r => r.Email == email, ct);

                return !userWithEmailExists;
            })
            .WithCode(Register.ErrorCodes.EmailIsTaken)
            .WithMessage("This email is taken.");;

        RuleFor(e => e.Command.Password)
            .NotEmpty()
                .WithCode(Register.ErrorCodes.PasswordIsEmpty)
                .WithMessage("Password must not be empty.")
            .MinimumLength(6)
                .WithCode(Register.ErrorCodes.PasswordTooShort)
                .WithMessage("Password must have at least 6 characters.");

        RuleFor(e => e.Command.Username)
            .NotEmpty()
                .WithCode(Register.ErrorCodes.UsernameIsEmpty)
                .WithMessage("Username must not be empty.")
            .MustAsync(async (username, ct) => 
            {
                var userWithUsernameExists = await dbContext.Users
                    .AnyAsync(r => r.Username == username, ct);

                return !userWithUsernameExists;
            })
            .WithCode(Register.ErrorCodes.UsernameIsTaken)
            .WithMessage("This username is taken.");
    }
}

public class RegisterCH : CommandHandler<Register>
{
    private readonly UserManager<AuthUser> userManager;
    private readonly Repository<User> users;

    public RegisterCH(UserManager<AuthUser> userManager, Repository<User> users)
    {
        this.userManager = userManager;
        this.users = users;
    }

    public override async Task HandleAsync(Register command, CoreContext context)
    {
        var claim = new IdentityUserClaim<Guid>();
        claim.InitializeFromClaim(new Claim(Auth.KnownClaims.Role, Auth.Roles.User));
        var userId = Guid.NewGuid();

        var authUser = new AuthUser
        {
            Id = userId,
            UserName = command.Username,
            Email = command.Email,
            Claims = { claim },
        };

        var result = await userManager.CreateAsync(authUser);

        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Failed to create IdentityUser");
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(authUser);
        var resetPasswordResult = await userManager.ResetPasswordAsync(authUser, token, command.Password);

        var user = User.Create(userId, command.Username, command.Email);
        await users.AddAsync(user);
    }
}