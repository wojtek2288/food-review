namespace FoodReview.Core.Services.Configuration;

public static class BlobStorageConnectionStringParser
{
    public static Dictionary<string, string> Parse(string connectionString)
    {
        return connectionString.Split(';', StringSplitOptions.RemoveEmptyEntries)
            .Select(v => v.Split('=', 2))
            .ToDictionary(v => v[0], v => v[1]);
    }
}