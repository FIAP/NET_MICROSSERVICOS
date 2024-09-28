using API.Entities;
using API.Infra.Mapping;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Professor> Professor { get; set; }
    public DbSet<Empresa> Empresa { get; set; }  
    public DbSet<Endereco> Endereco { get; set; }  

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);


        base.OnModelCreating(modelBuilder);
    }

}