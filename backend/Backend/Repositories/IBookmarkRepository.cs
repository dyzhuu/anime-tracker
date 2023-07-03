using System;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Repositories
{
	public interface IBookmarkRepository
	{
        ICollection<Bookmark> GetBookmarks(int userId);

        Bookmark GetBookmark(int userId, int animeId);

        bool BookmarkExists(int userId, int animeId);

        bool CreateBookmark(Bookmark bookmark);

        bool UpdateBookmark(BookmarkDto bookmarkDto);
    }
}

