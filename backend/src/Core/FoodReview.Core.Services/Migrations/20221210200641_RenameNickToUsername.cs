using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodReview.Core.Services.Migrations
{
    public partial class RenameNickToUsername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nick",
                table: "Users",
                newName: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "Nick");
        }
    }
}
