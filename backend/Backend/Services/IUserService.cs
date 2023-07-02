using System;
using Backend.Models;
using Backend.Dto;

namespace Backend.Services
{
	public interface IUserService
	{
        ICollection<User> GetUsers();

        User GetUser(int userId);

        User GetUser(string username);

        User CreateUser(UserDto userDto);

        ICollection<BookmarkDto> GetBookmarks(int userId);

        Bookmark GetBookmark(int animeId, int userId);

        bool UserExists(int userId);

        bool CreateBookmark(int userId, int animeId, BookmarkDto bookmarkDto);
    }
}

