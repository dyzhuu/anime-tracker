using System;
using Backend.Models;
using Backend.Dto;

namespace Backend.Repositories
{
	public interface IUserRepository
	{
		// scuffed
        bool CreateUser(User user);

		bool UpdateUser(User user);

		ICollection<User> GetUsers();

		User GetUser(int id);

        User GetUser(string username);

        bool UserExists(int userId);

        ICollection<Bookmark> GetBookmarks(int userId);

		Bookmark GetBookmark(int userId, int animeId);

		bool BookmarkExists(int userId, int animeId);

		bool CreateBookmark(Bookmark bookmark);

		bool UpdateBookmark(BookmarkDto bookmarkDto);
	}
}

