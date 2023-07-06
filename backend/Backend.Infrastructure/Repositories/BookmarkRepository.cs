using Backend.Infrastructure.Contexts;
using Backend.Core.Dtos;
using Backend.Domain;
using Backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
	public class BookmarkRepository : IBookmarkRepository
	{
        private readonly DataContext _context;

		public BookmarkRepository(DataContext context)
		{
            _context = context;
		}

        public async Task<ICollection<Bookmark>> GetBookmarks(int userId)
        {
            return await _context.Bookmarks
                .Where(b => b.UserId == userId)
                .Include(b => b.Anime)
                .OrderBy(b => b.Anime.Title)
                .ToListAsync();
        }

        public async Task<Bookmark> GetBookmark(int userId, int animeId)
        {
            return await _context.Bookmarks
                .Where(a => a.AnimeId == animeId)
                .Where(u => u.User.Id == userId)
                .Include(b => b.Anime)
                .Include(b => b.User)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> BookmarkExists(int userId, int animeId)
        {
            return await _context.Bookmarks
                .Where(b => b.UserId == userId)
                .AnyAsync(b => b.AnimeId == animeId);
        }

        public async Task<bool> CreateBookmark(Bookmark bookmark)
        {
            _context.Add(bookmark);
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<bool> UpdateBookmark(Bookmark bookmark)
        {
            _context.Bookmarks.Update(bookmark);

            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<bool> DeleteBookmark(Bookmark bookmark)
        {
            _context.Remove(bookmark);
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }
    }
}

