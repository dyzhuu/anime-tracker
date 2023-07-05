using Backend.Domain;
using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IUserService
	{
        //scuffed
        Task<bool> CreateUser(UserDto userDto);

        Task<bool> VerificationSuccess(UserReqDto userReqDto);

        Task<UserDto> RegisterUser(UserReqDto userReqDto);

        Task<bool> UpdateUser(UserDto userDto);

        Task<ICollection<UserDto>> GetUsers();

        Task<UserDto> GetUser(int userId);

        Task<UserDto> GetUser(string username);

        Task<bool> UserExists(int userId);

        Task<bool> UserExists(string username);

        Task<bool> DeleteUser(int userId);

    }
}

