using Backend.Domain;
using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IUserService
	{
        //scuffed
        bool CreateUser(UserDto userDto);

        bool UpdateUser(UserDto userDto);

        ICollection<UserDto> GetUsers();

        UserDto GetUser(int userId);

        UserDto GetUser(string username);

        bool UserExists(int userId);

        bool UserExists(string username);

        bool DeleteUser(int userId);

    }
}

