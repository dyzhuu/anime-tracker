using Backend.Core.Dtos;
using Backend.Domain;

namespace Backend.Core.Interfaces
{
    public interface IBookmarkRepository
	{
        Task<ICollection<Bookmark>> GetBookmarks(int userId);

        Task<Bookmark> GetBookmark(int userId, int animeId);

        Task<bool> BookmarkExists(int userId, int animeId);

        Task<bool> CreateBookmark(Bookmark bookmark);

        Task<bool> UpdateBookmark(Bookmark bookmark);

        Task<bool> DeleteBookmark(Bookmark bookmark);
    }
}

