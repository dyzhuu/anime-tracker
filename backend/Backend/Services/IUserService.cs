using System;
using Backend.Models;
using Backend.Dtos;

namespace Backend.Services
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

