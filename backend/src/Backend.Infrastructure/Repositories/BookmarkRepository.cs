using Backend.Infrastructure.Contexts;
using Backend.Core.Dtos;
using Backend.Core.Models;
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

        public ICollection<Bookmark> GetBookmarks(int userId)
        {
            return _context.Bookmarks.Where(b => b.User.Id == userId).Include(b => b.Anime).OrderBy(b => b.Anime.Title).ToList();
        }

        public Bookmark GetBookmark(int userId, int animeId)
        {
            return _context.Bookmarks.Where(a => a.AnimeId == animeId).Where(u => u.User.Id == userId).Include(b => b.Anime).Include(b => b.User).FirstOrDefault();
        }

        public bool BookmarkExists(int userId, int animeId)
        {
            return _context.Bookmarks.Where(b => b.UserId == userId).Any(b => b.AnimeId == animeId);
        }

        public bool CreateBookmark(Bookmark bookmark)
        {
            _context.Add(bookmark);
            return _context.SaveChanges() > 0 ? true : false;
        }

        public bool UpdateBookmark(BookmarkDto bookmarkDto)
        {
            Bookmark existingBookmark = GetBookmark(bookmarkDto.UserId, bookmarkDto.AnimeId);
            existingBookmark.Rating = bookmarkDto.Rating;
            existingBookmark.Status = bookmarkDto.Status;

            return _context.SaveChanges() > 0 ? true : false;
        }

        public bool DeleteBookmark(Bookmark bookmark)
        {
            _context.Remove(bookmark);
            return _context.SaveChanges() > 0 ? true : false;
        }
    }
}

