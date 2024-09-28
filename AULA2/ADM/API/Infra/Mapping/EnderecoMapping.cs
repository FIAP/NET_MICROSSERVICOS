using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Infra.Mapping;

public class EnderecoMapping : IEntityTypeConfiguration<Endereco>
{
    public void Configure(EntityTypeBuilder<Endereco> builder)
    {
        builder.ToTable("Endereco");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("id");

        builder.Property(e => e.Logradouro)
            .HasColumnName("logradouro")
            .HasMaxLength(255);

        builder.Property(e => e.Numero)
            .HasColumnName("numero")
            .HasMaxLength(50);

        builder.Property(e => e.Complemento)
            .HasColumnName("complemento")
            .HasMaxLength(255);

        builder.Property(e => e.Bairro)
            .HasColumnName("bairro")
            .HasMaxLength(255);

        builder.Property(e => e.Cidade)
            .HasColumnName("cidade")
            .HasMaxLength(255);

        builder.Property(e => e.Estado)
            .HasColumnName("estado")
            .HasMaxLength(255);

        builder.Property(e => e.CEP)
            .HasColumnName("cep")
            .HasMaxLength(20);

        builder.Property(e => e.Pais)
            .HasColumnName("pais")
            .HasMaxLength(100);
    }
}