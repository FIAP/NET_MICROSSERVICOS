using AutoMapper;
using Service.Models;

namespace WEB.Mappers
{
    public class UserMappingProfile : Profile
    {

        protected override void Configure()
        {           
            Mapper.CreateMap<Usuario, UserViewModel>().ReverseMap();              
        }
    }
}