using API.Entities;
using API.Interfaces;
using Infrastructure.Repositories;

namespace API.Repositories
{
    public class EnderecoRepository : Repository<EnderecoViewModel>, IRepository<EnderecoViewModel>
    {
        public EnderecoRepository(AppDbContext context) : base(context)
        {
        }
    }
}
