using API.Controllers;
using API.Entities;
using API.Infra;
using API.Interfaces;
using API.Models;
using AutoMapper;
using MassTransit;
using System.Text.Json;

namespace API.Services;

public class ProfessorService(IRepository<Professor> repository, IMapper mapper, IPublishEndpoint publishEndpoint, BaseLogger<ProfessorService> logger, ICorrelationIdGenerator correlationId) : IProfessorService
{
    private readonly IRepository<Professor> _repository = repository;

    private readonly IMapper _mapper = mapper;
    private readonly IPublishEndpoint _publishEndpoint = publishEndpoint;
    private readonly BaseLogger<ProfessorService> _logger = logger;
    protected readonly ICorrelationIdGenerator _correlationId = correlationId;


    public async Task AddAsync(ProfessorViewModel entity)
    {
        _logger.LogInformation($"Iniciando mapeamento do professor");

        var domain = _mapper.Map<Professor>(entity);
        await _repository.AddAsync(domain);

        _logger.LogInformation($"enviando fluxo para topico {JsonSerializer.Serialize(entity)}");


        PublishToRabbitMQAsync(entity);
    }

    private async Task PublishToRabbitMQAsync(ProfessorViewModel professor)
    {
        await _publishEndpoint.Publish(new ProfessorCreatedViewModel
        {
            Nome = professor.Nome,
            Email = professor.Email,
            CNPJ = professor.CNPJ,
            CorrelationID = _correlationId.Get()
        });

        _logger.LogInformation($"Evento publicado com sucesso");

    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<ProfessorViewModel>> GetAllAsync()
    {
        var domain = await _repository.GetAllAsync();
        var vm = _mapper.Map<IEnumerable<ProfessorViewModel>>(domain);

        return vm;
    }

    public async Task<ProfessorViewModel> GetByIdAsync(int id)
    {
        var domain = await _repository.GetByIdAsync(id);
        var vm = _mapper.Map<ProfessorViewModel>(domain);
        return vm;
    }

    public async Task<ProfessorViewModel> GetSchedules(int id)
    {
        var domain = await _repository.GetByIdAsync(id);
        var vm = _mapper.Map<ProfessorViewModel>(domain);


        return vm;
    }

    public async Task UpdateAsync(ProfessorViewModel entity)
    {
        var domain = _mapper.Map<Professor>(entity);
        await _repository.UpdateAsync(domain);
    }




}
