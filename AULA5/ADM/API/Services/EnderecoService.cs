using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class EnderecoService : Service<EnderecoViewModel>, IService<EnderecoViewModel>
    {
        public EnderecoService(IRepository<EnderecoViewModel> repository) : base(repository)
        {
        }

    }
}
