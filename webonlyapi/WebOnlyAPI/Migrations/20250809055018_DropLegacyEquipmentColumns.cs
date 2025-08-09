using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebOnlyAPI.Migrations
{
    /// <inheritdoc />
    public partial class DropLegacyEquipmentColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Features",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "Specs",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Equipment");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Features",
                table: "Equipment",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specs",
                table: "Equipment",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Equipment",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
