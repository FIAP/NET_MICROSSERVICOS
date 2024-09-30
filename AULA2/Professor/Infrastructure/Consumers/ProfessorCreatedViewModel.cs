using System.Text.Json.Serialization;

namespace API.Models;

public class ProfessorCreatedViewModel(string nome, string email, string cNPJ)
{
    public string Nome { get; set; } = nome;
    public string Email { get; set; } = email;
    public string CNPJ { get; set; } = cNPJ;
    public string CorrelationID { get; set; }

}


public class CnpjResponse
{
    [JsonPropertyName("status")]
    public string Status { get; set; }

    [JsonPropertyName("situacao")]
    public string Situacao { get; set; }
}
