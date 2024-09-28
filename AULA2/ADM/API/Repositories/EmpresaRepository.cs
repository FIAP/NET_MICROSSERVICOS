using API.Entities;
using API.Interfaces;
using Infrastructure.Repositories;

namespace API.Repositories
{
    public class EmpresaRepository : Repository<Empresa>, IRepository<Empresa>
    {
        public EmpresaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
