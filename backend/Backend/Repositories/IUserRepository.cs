using System;
using Backend.Models;

namespace Backend.Repositories
{
	public interface IUserRepository
	{
		ICollection<User> GetUsers();

		User GetUser(int id);

        User GetUser(string username);

        User CreateUser(User user);

		ICollection<Bookmark> GetBookmarks(int userId);

		Bookmark GetBookmark(int animeId, int userId);

		bool UserExists(int userId);

		bool CreateBookmark(Bookmark bookmark);

	}
}

