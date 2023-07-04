using Backend.Core.Dtos;
using Backend.Core.Models;

namespace Backend.Core.Interfaces
{
    public interface IBookmarkService
	{
        ICollection<BookmarkDto> GetBookmarks(int userId);

        Bookmark GetBookmark(int userId, int animeId);

        bool BookmarkExists(int userId, int animeId);

        bool CreateBookmark(BookmarkDto bookmarkDto);

        bool UpdateBookmark(BookmarkDto bookmarkDto);

        bool DeleteBookmark(int userId, int animeId);
    }
}

