using System;
using Backend.Dto;
using Backend.Models;

namespace Backend.Services
{
	public interface IBookmarkService
	{
        ICollection<BookmarkDto> GetBookmarks(int userId);

        Bookmark GetBookmark(int userId, int animeId);

        bool BookmarkExists(int userId, int animeId);

        bool CreateBookmark(BookmarkDto bookmarkDto);

        bool UpdateBookmark(BookmarkDto bookmarkDto);
    }
}

