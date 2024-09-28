using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Infra.Mapping;

public class ProfessorMapping : IEntityTypeConfiguration<Professor>
{
    public void Configure(EntityTypeBuilder<Professor> builder)
    {
        builder.ToTable("Professor");

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id");

        builder.Property(p => p.Nome)
            .HasColumnName("nome")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(p => p.Email)
            .HasColumnName("email")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(p => p.CPF)
            .HasColumnName("cpf")
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(p => p.EnderecoId)
       .HasColumnName("enderecoid")
       .IsRequired();

          builder.HasOne(p => p.Endereco)
            .WithOne()
            .HasForeignKey<Professor>(p => p.EnderecoId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}
