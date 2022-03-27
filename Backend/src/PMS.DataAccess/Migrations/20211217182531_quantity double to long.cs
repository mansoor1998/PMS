using Microsoft.EntityFrameworkCore.Migrations;

namespace PMS.DataAccess.Migrations
{
    public partial class quantitydoubletolong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Quantity",
                table: "Medicines",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Quantity",
                table: "Medicines",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
