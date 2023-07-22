using Backend.Core.Dtos;
using Backend.Domain;

namespace Backend.Core.Interfaces
{
    public interface IBookmarkService
	{
        Task<ICollection<BookmarkDto>> GetBookmarks(int userId);

        Task<bool> BookmarkExists(int userId, int animeId);

        Task<bool> CreateBookmark(BookmarkDto bookmarkDto);

        Task<bool> UpdateBookmark(BookmarkDto bookmarkDto);

        Task<bool> DeleteBookmark(int userId, int animeId);
    }
}

