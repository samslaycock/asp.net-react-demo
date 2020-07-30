using Microsoft.EntityFrameworkCore.Migrations;

namespace asp_react_demo.Migrations
{
    public partial class DBCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DPlayers",
                columns: table => new
                {
                    playerID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    forename = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    surname = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    age = table.Column<int>(nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DPlayers", x => x.playerID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DPlayers");
        }
    }
}
