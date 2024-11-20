namespace API.Entities;

public class Professor
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string CPF { get; set; }
    public Endereco Endereco { get; set; }
    public int EnderecoId { get; set; } 

}