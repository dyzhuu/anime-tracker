﻿using AutoMapper;
using Backend.Core.Dtos;
using Backend.Domain;
using Backend.Core.Interfaces;

namespace Backend.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly IExternalUserMappingRepository _userMappingRepo;

        public UserService(IUserRepository userRepository, IMapper mapper, IExternalUserMappingRepository userMappingRepository)
        {
            _userRepo = userRepository;
            _mapper = mapper;
            _userMappingRepo = userMappingRepository;
        }

        private async Task<string> GenerateUniqueUsername(string originalUsername)
        {
            string uniqueUsername = originalUsername;
            int counter = 1;

            while (await _userRepo.UserExists(uniqueUsername))
            {
                uniqueUsername = $"{originalUsername}{counter}";
                counter++;
            }

            return uniqueUsername;
        }

        public async Task<string> GetUniqueUsername(string desiredUsername)
        {
            if (!await _userRepo.UserExists(desiredUsername))
            {
                return desiredUsername;
            }

            return await GenerateUniqueUsername(desiredUsername);
        }

        public async Task<UserDto> RegisterUser(UserReqDto userReqDto)
        {
            userReqDto.Password = BCrypt.Net.BCrypt.HashPassword(userReqDto.Password);

            User user = _mapper.Map<User>(userReqDto);
            return _mapper.Map<UserDto>(await _userRepo.RegisterUser(user));
        }

        public async Task<UserDto> CreateUserFromExternalId(string externalId, string username)
        {
            ExternalUserMapping mapping = await _userMappingRepo.GetByExternalId(externalId);

            if (mapping != null)
            {
                User user = await _userRepo.GetUser(mapping.InternalId);
                return _mapper.Map<UserDto>(user);
            }
            else
            {
                User newUser = new User { Username = await GetUniqueUsername(username) };
                newUser = await _userRepo.RegisterUser(newUser);

                await _userMappingRepo.AddMapping(externalId, newUser.Id);

                return _mapper.Map<UserDto>(newUser);
            }
        }

        public async Task<int> GetInternalId(string externalId)
        {
            ExternalUserMapping mapping = await _userMappingRepo.GetByExternalId(externalId);
            if (mapping == null)
            {
                return int.Parse(externalId);
            }
            else
            {
                return mapping.InternalId;
            }
        }


        public async Task<bool> VerificationSuccess(UserReqDto userReqDto)
        {
            User user = await _userRepo.GetUser(userReqDto.Username);
            return BCrypt.Net.BCrypt.Verify(userReqDto.Password, user.PasswordHash);
        }

        public async Task<bool> UpdateUser(UserDto userDto)
        {
            User user = await _userRepo.GetUser(userDto.Id);
            if (user == null)
            {
                return false;
            }

            if (string.IsNullOrEmpty(userDto.Username))
            {
                userDto.Username = user.Username;
            }
            if (!string.IsNullOrEmpty(userDto.Password))
            {
                userDto.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            } else
            {
                userDto.Password = user.PasswordHash;
            }

            _mapper.Map(userDto, user);
            
            return await _userRepo.UpdateUser(user);
        }

        public async Task<bool> DeleteUser(int userId)
        {
            User user = await _userRepo.GetUser(userId);
            return await _userRepo.DeleteUser(user);
        }

        public async Task<UserDto> GetUser(int userId)
        {
            User user = await _userRepo.GetUser(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUser(string username)
        {
            User user = await _userRepo.GetUser(username);
            UserDto userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<ICollection<UserDto>> GetUsers()
        {
            ICollection<User> users = await _userRepo.GetUsers();
            ICollection<UserDto> userDtos = _mapper.Map<List<UserDto>>(users);
            return userDtos;
        }

        public async Task<bool> UserExists(int userId)
        {
            return await _userRepo.UserExists(userId);
        }

        public async Task<bool> UserExists(string username)
        {
            return await _userRepo.UserExists(username);
        }

        public async Task<bool> UserExists(string username, int currentUserId)
        {
            // Perform a query to check if the username already exists for a user other than the current user.
            return await _userRepo.UserExistsExceptUserId(username, currentUserId);
        }

    }
}

