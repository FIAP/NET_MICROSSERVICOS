using API.Entities;
using API.Interfaces;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProfessorRepository(AppDbContext context) : Repository<Professor>(context), IRepository<Professor>
    {

        private readonly AppDbContext _dataContext = context;

        public async Task<Professor> GetByIdAsync(int id)
        {
            return await _dataContext.Set<Professor>().Include(x => x.Endereco).FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
