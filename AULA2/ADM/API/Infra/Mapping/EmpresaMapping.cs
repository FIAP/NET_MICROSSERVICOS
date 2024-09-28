using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Infra.Mapping;

public class EmpresaMapping : IEntityTypeConfiguration<Empresa>
{
    public void Configure(EntityTypeBuilder<Empresa> builder)
    {
        builder.ToTable("Empresa");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("id");

        builder.Property(e => e.Nome)
            .HasColumnName("nome")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(e => e.TotalTestesComprados)
            .HasColumnName("total_testes_comprados")
            .IsRequired();

        builder.Property(e => e.Email)
            .HasColumnName("email")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(e => e.CNPJ)
            .HasColumnName("cnpj")
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(e => e.EnderecoId)
            .HasColumnName("enderecoid")
            .IsRequired();

        builder.HasOne(e => e.Endereco)
            .WithOne() 
            .HasForeignKey<Empresa>(e => e.EnderecoId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
