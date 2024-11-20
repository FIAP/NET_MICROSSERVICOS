using Data.Interfaces;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        public Task<long> GetAllApplicants()
        {
            return Task.FromResult(10L);
        }

        public Task<(long, int, int)> GetAllCompanies()
        {
            return Task.FromResult((10L, 5, 3));
        }

        public Task<long> GetAllTeachers()
        {
            return Task.FromResult(30L);
        }
    }
}
