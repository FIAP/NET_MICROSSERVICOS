using AutoMapper;
using Model.Entities;
using Service.Models;

namespace WEB.Mappers
{
    public class UserMappingProfile : Profile
    {

        protected override void Configure()
        {           
            Mapper.CreateMap<User, UserViewModel>().ReverseMap();              
        }
    }
}