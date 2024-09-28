using API.Models;
using Applicantion.Interfaces;
using Domain.Entities;
using MassTransit;

namespace Infrastructure.Consumers
{
    public class ProfessorConsumer(IRepository<Professor> repository) : IConsumer<ProfessorCreatedViewModel>
    {
        private readonly IRepository<Professor> _repository = repository;

        public Task Consume(ConsumeContext<ProfessorCreatedViewModel> context)
        {
            ProfessorCreatedViewModel message = context.Message;

            _repository.AddAsync(new Professor
            {
                 Nome = message.Nome,
                 Email = message.Email,
                 CNPJ = message.CNPJ,
            });

            Console.WriteLine($"Mensagem recebida: Professor {message.Nome}.");

            return Task.CompletedTask;
        }
    }
}
