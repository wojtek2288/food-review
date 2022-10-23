using System.Text;
using System.Text.Json;
using FluentValidation;
using FoodReview.Core.Services.CQRS.Extensions;
using FoodReview.Core.Services.CQRS.Validation;
using Microsoft.AspNetCore.Diagnostics;

namespace FoodReview.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseFluentValidationExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(x =>
        {
           x.Run(async context =>
           {
                var errorFeature = context.Features.Get<IExceptionHandlerFeature>()!;
                var exception = errorFeature.Error;

                if (!(exception is ValidationException validationException))
                {
                    throw exception;
                }

                var errors = new List<ValidationResponse>();

                foreach(var error in validationException.Errors)
                {
                    var errorState = error.CustomState as FluentValidatorErrorState;

                    errors.Add(new ValidationResponse
                    {
                        PropertyName = error.PropertyName.Split('.').Last(),
                        ErrorMessage = error.ErrorMessage,
                        ErrorCode = errorState?.ErrorCode,
                    });
                }

                var errorText = JsonSerializer.Serialize(errors);
                context.Response.StatusCode = 400;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(errorText, Encoding.UTF8);
           }); 
        });

        return app;
    }
}
