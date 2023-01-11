namespace FoodReview.Core.Contracts.Admin.DTO.Admin;

public class UserDTO
{
    public string Id { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string? Description { get; set; }
}