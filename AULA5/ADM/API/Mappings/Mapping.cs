using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Professor, ProfessorViewModel>().ReverseMap();
            CreateMap<Endereco, EnderecoViewModel>().ReverseMap();
        }
    }
}
