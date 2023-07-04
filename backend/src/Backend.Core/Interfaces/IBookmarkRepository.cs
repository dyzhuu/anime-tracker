using Backend.Core.Dtos;
using Backend.Core.Models;

namespace Backend.Core.Interfaces
{
    public interface IBookmarkRepository
	{
        ICollection<Bookmark> GetBookmarks(int userId);

        Bookmark GetBookmark(int userId, int animeId);

        bool BookmarkExists(int userId, int animeId);

        bool CreateBookmark(Bookmark bookmark);

        bool UpdateBookmark(BookmarkDto bookmarkDto);

        bool DeleteBookmark(Bookmark bookmark);
    }
}

