﻿using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Policy = "admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessoresController : ControllerBase
    {
        private readonly IProfessorService _professorService;

        public ProfessoresController(IProfessorService professorService)
        {
            _professorService = professorService;
        }

        // GET: api/professor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessorViewModel>>> GetAll()
        {
            var professores = await _professorService.GetAllAsync();
            return Ok(professores);
        }

        // GET: api/professor/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfessorViewModel>> GetByIdAsync(int id)
        {
            var professor = await _professorService.GetByIdAsync(id);
            if (professor == null)
            {
                return NotFound();
            }
            return Ok(professor);
        }

        [HttpGet("schedules/{id}")]
        public async Task<ActionResult<IEnumerable<ProfessorViewModel>>> GetSchedules(int id)
        {
            var professores = await _professorService.GetSchedules(id); 
            return Ok(professores);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProfessorViewModel professor)
        {
            await _professorService.AddAsync(professor);
            return Ok(new {mensagem = "Professor criado com sucesso!" });
        }

        // PUT: api/professor/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ProfessorViewModel professor)
        {
            var existingProfessor = await _professorService.GetByIdAsync(id);
            if (existingProfessor == null)
            {
                return NotFound();
            }

            // Atualize as propriedades do professor existente conforme necessário
            existingProfessor.Nome = professor.Nome;
            existingProfessor.Email = professor.Email;
            existingProfessor.CPF = professor.CPF;
            existingProfessor.Endereco = professor.Endereco;

            await _professorService.UpdateAsync(existingProfessor);
            return NoContent();
        }

        // DELETE: api/professor/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var professor = await _professorService.GetByIdAsync(id);
            if (professor == null)
            {
                return NotFound();
            }

            await _professorService.DeleteAsync(id);
            return NoContent();
        }
    }
}
