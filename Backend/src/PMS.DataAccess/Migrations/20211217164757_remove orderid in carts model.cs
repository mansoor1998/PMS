using Microsoft.EntityFrameworkCore.Migrations;

namespace PMS.DataAccess.Migrations
{
    public partial class removeorderidincartsmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Carts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "OrderId",
                table: "Carts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
