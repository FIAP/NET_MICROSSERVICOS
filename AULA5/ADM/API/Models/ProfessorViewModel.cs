using API.Models;

namespace API.Entities;

public class ProfessorViewModel
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string CPF { get; set; }
    public string CNPJ { get; set; }
    public EnderecoViewModel Endereco { get; set; }
    public int EnderecoId { get; set; }

    public IList<AgendamentoViewModel> Agendamentos { get; set; } = new List<AgendamentoViewModel>();

}