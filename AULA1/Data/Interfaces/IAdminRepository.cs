using Model.Entities;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IAdminRepository
    {
        Task<long> GetAllTeachers();
        Task<(long, int, int)> GetAllCompanies();
        Task<long> GetAllApplicants();
    }
}
