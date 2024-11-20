using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Professor> Professor { get; set; }
    public DbSet<ProfessorAgenda> ProfessorAgenda { get; set; }
    public DbSet<Agendamento> Agendamento { get; set; }
    public DbSet<Candidato> Candidato { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}