using API.Models;
using Applicantion.Interfaces;
using Domain.Entities;
using MassTransit;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Infrastructure.Consumers
{
    public class ProfessorConsumer(IRepository<Professor> repository, ILogger<ProfessorConsumer> logger) : IConsumer<ProfessorCreatedViewModel>
    {
        private readonly IRepository<Professor> _repository = repository;
        protected readonly ILogger<ProfessorConsumer> _logger = logger;

        public Task Consume(ConsumeContext<ProfessorCreatedViewModel> context)
        {
            ProfessorCreatedViewModel message = context.Message;

            _logger.LogInformation($"[Mensagem recebida: {message.CorrelationID}] {JsonSerializer.Serialize(message)}");

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
