using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DataInfrastructure.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Animals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descricao = table.Column<string>(nullable: true),
                    Preco = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Compras",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Comprador = table.Column<string>(nullable: true),
                    CompradorId = table.Column<int>(nullable: false),
                    IdCompra = table.Column<int>(nullable: false),
                    DataEntrega = table.Column<DateTime>(nullable: false),
                    DataCompra = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compras", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pecuaristas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pecuaristas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompraGados",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataEntrega = table.Column<DateTime>(nullable: false),
                    PecuaristaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompraGados", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompraGados_Pecuaristas_PecuaristaId",
                        column: x => x.PecuaristaId,
                        principalTable: "Pecuaristas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompraGadoItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Quantidade = table.Column<string>(nullable: true),
                    CompraGadoId = table.Column<int>(nullable: false),
                    AnimalId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompraGadoItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompraGadoItems_Animals_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompraGadoItems_CompraGados_CompraGadoId",
                        column: x => x.CompraGadoId,
                        principalTable: "CompraGados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompraGadoItems_AnimalId",
                table: "CompraGadoItems",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_CompraGadoItems_CompraGadoId",
                table: "CompraGadoItems",
                column: "CompraGadoId");

            migrationBuilder.CreateIndex(
                name: "IX_CompraGados_PecuaristaId",
                table: "CompraGados",
                column: "PecuaristaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompraGadoItems");

            migrationBuilder.DropTable(
                name: "Compras");

            migrationBuilder.DropTable(
                name: "Animals");

            migrationBuilder.DropTable(
                name: "CompraGados");

            migrationBuilder.DropTable(
                name: "Pecuaristas");
        }
    }
}
