using Backend.Domain;

namespace Backend.Core.Interfaces
{
    public interface IUserRepository
	{
        // scuffed
        Task<bool> CreateUser(User user);

        Task<User> RegisterUser(User user);

		Task<bool> UpdateUser(User user);

		Task<ICollection<User>> GetUsers();

		Task<User> GetUser(int id);

        Task<User> GetUser(string username);

		Task<bool> DeleteUser(User user);

        Task<bool> UserExists(int userId);

        Task<bool> UserExists(string username);

    }
}

