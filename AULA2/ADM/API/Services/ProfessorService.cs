using API.Entities;
using API.Interfaces;
using API.Models;
using AutoMapper;
using MassTransit;

namespace API.Services;

public class ProfessorService(IRepository<Professor> repository, IMapper mapper, IPublishEndpoint publishEndpoint) : IProfessorService
{
    private readonly IRepository<Professor> _repository = repository;

    private readonly IMapper _mapper = mapper;
    private readonly IPublishEndpoint _publishEndpoint = publishEndpoint;


    public async Task AddAsync(ProfessorViewModel entity)
    {
        var domain = _mapper.Map<Professor>(entity);
        await _repository.AddAsync(domain);

        PublishToRabbitMQAsync(entity);
    }

    private async Task PublishToRabbitMQAsync(ProfessorViewModel professor)
    {
        await _publishEndpoint.Publish(new ProfessorCreatedViewModel
        {
            Nome = professor.Nome,
            Email = professor.Email,
            CNPJ = professor.CNPJ
        });
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
