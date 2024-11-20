using Applicantion.Interfaces;
using Domain.Entities;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class ProfessorRepository(AppDbContext context, IConfiguration configuration) : Repository<Professor>(context), IRepository<Professor>
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task AddAsync(Professor professor)
        {
            var validateCNPJ = await ValidateCNPJAsync(professor.CNPJ);
            if (validateCNPJ)
            {
                //Notificar
                //Save   
            }

        }

        private async Task<bool> ValidateCNPJAsync(string cnpj)
        {
            var validator = new CnpjValidator(_configuration);
            return await validator.ValidateCNPJAsync(cnpj);
        }

    }
}
