using Domain.Entities;
using Microsoft.EntityFrameworkCore;


namespace DataInfrastructure.Data
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options)
        : base(options)
        {

        }

        public DbSet<Pecuarista> Pecuaristas { get; set; }
        public DbSet<CompraGado> CompraGados { get; set; }
        public DbSet<CompraGadoItem> CompraGadoItems { get; set; }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Compra> Compras { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder
            //.UseSqlServer(@"Data Source=DESKTOP-EG9LEU0\SQLEXPRESS;Initial Catalog=ProjetoModeloMF;Integrated Security=True;");
            optionsBuilder.UseNpgsql(@"Host = ec2-50-17-178-87.compute-1.amazonaws.com; Port = 5432; Pooling = true; Database = dcgv9ts02sk8ta; User Id = aseqyhxhvfvkzz; 
            Password = 1484b2f0e1b9f5cf8411a07e14bf362a652c7621edeea806d9bde645f701bb4c;sslmode=Require;Trust Server Certificate=true;");
        }

    }
}
