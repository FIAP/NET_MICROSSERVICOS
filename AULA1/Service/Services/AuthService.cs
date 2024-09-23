﻿using Service.Interfaces;
using Model.Entities;
using Service.Models;
using AutoMapper;
using Data.Interfaces;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AuthService : IAuthService
    {
        private IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<UserViewModel> LoginAsync(UserViewModel user)
        {
            var userDomain = Mapper.Map<UserViewModel, User>(user);
            var validateUser = await _authRepository.Login(userDomain);

            var userViewModel = Mapper.Map<User, UserViewModel>(validateUser);

            return userViewModel;
        }
    }
}
