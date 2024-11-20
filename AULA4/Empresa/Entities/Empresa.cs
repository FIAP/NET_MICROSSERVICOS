namespace Empresas.Entities;

public class Empresa
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string CNPJ { get; set; }

    public List<Candidato> ListaCandidatos { get; set; } = new List<Candidato>();
}