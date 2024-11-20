using System.Collections.Generic;

public class Empresa
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }

    public List<Candidato> ListaCandidatos { get; set; } = new List<Candidato>();
}