namespace API.Entities;

public class Empresa
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public int TotalTestesComprados { get; set; }
    public string Email { get; set; }
    public string CNPJ { get; set; }
    public Endereco Endereco { get; set; }
    public int EnderecoId { get; set; }

}