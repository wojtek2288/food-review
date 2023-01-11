namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class UserDetailsDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string ImageUrl { get; set; }
    public string Email { get; set; }
}