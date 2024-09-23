using Model.Entities;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> Login(User user);
    }
}
