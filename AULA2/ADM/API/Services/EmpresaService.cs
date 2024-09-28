using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class EmpresaService : Service<Empresa>, IService<Empresa>
    {
        public EmpresaService(IRepository<Empresa> repository) : base(repository)
        {
        }
       
    }
}
