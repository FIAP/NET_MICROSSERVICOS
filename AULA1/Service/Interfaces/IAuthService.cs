using Service.Models;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IAuthService
    {
        Task<UserViewModel> LoginAsync(UserViewModel user);
    }
}
