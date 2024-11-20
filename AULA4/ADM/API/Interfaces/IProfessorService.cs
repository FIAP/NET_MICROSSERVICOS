using API.Entities;

namespace API.Interfaces;

public interface IProfessorService : IService<ProfessorViewModel>
{
     Task<ProfessorViewModel> GetSchedules(int id);
}
