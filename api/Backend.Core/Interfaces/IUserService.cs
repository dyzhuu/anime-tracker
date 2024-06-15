﻿using Backend.Domain;
using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IUserService
	{
        Task<bool> VerificationSuccess(UserReqDto userReqDto);

        Task<UserDto> RegisterUser(UserReqDto userReqDto);

        Task<UserDto> CreateUserFromExternalId(string externalId, string username);

        Task<int> GetInternalId(string externalId);

        Task<bool> UpdateUser(UserDto userDto);

        Task<ICollection<UserDto>> GetUsers();

        Task<UserDto> GetUser(int userId);

        Task<UserDto> GetUser(string username);

        Task<bool> UserExists(int userId);

        Task<bool> UserExists(string username);

        Task<bool> UserExists(string username, int currentUserId);

        Task<bool> DeleteUser(int userId);

    }
}

