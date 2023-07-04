using Backend.Core.Models;
using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IUserService
	{
        //scuffed
        bool CreateUser(User user);

        bool UpdateUser(UserDto userDto);

        ICollection<User> GetUsers();

        User GetUser(int userId);

        User GetUser(string username);

        bool UserExists(int userId);

        bool DeleteUser(int userId);

    }
}

