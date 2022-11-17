using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

public class CustomRouteToken : IApplicationModelConvention
{
    private readonly string tokenRegex;
    private readonly Func<ControllerModel, string?> valueGenerator;

    public CustomRouteToken(string tokenName, Func<ControllerModel, string?> valueGenerator)
    {
        this.tokenRegex = $@"(\[{tokenName}])(?<!\[\1(?=]))";
        this.valueGenerator = valueGenerator;
    }

    public void Apply(ApplicationModel application)
    {
        foreach (var controller in application.Controllers)
        {
            var tokenValue = valueGenerator(controller);
            UpdateSelectors(controller.Selectors, tokenValue);
            UpdateSelectors(controller.Actions.SelectMany(a => a.Selectors), tokenValue);
        }
    }

    private void UpdateSelectors(IEnumerable<SelectorModel> selectors, string? tokenValue)
    {
        foreach (var selector in selectors.Where(s => s.AttributeRouteModel != null))
        {
            selector.AttributeRouteModel!.Template = InsertTokenValue(selector.AttributeRouteModel.Template, tokenValue);
            selector.AttributeRouteModel.Name = InsertTokenValue(selector.AttributeRouteModel.Name, tokenValue);
        }
    }

    private string? InsertTokenValue(string? template, string? tokenValue)
    {
        if (template is null || tokenValue is null)
        {
            return null;
        }

        return Regex.Replace(template, tokenRegex, tokenValue);
    }
}