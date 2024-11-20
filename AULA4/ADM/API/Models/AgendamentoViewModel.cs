using API.Entities;

namespace API.Models;

public class AgendamentoViewModel
{

    public int Id { get; set; }
    public int ProfessorId { get; set; }
    public int CandidatoId { get; set; }
    public DateTime DataAgendamento { get; set; }
    public string Feedback { get; set; }
    public string Status { get; set; }

    public ProfessorViewModel Professor { get; set; }
    public CandidatoViewModel Candidato { get; set; }
}