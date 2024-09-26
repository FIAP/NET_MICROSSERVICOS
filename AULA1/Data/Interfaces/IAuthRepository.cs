using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IAuthRepository
    {
        Task<Usuario> Login(Usuario user);
    }
}
