using System;
using Backend.Contexts;
using Backend.Dto;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        //scuffed CHANGE TO LOGIN AND REGISTER
        public bool CreateUser(User user)
        {
            _context.Add(user);
            return _context.SaveChanges() > 0 ? true : false;
        }

        //Users
        public bool UpdateUser(User user)
        {
            //FIXME
            _context.Update(user);
            return _context.SaveChanges() > 0 ? true : false;
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).Include(u => u.Bookmarks).ToList();
        }

        public User GetUser(int userId)
        {
            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public bool UserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        //Bookmarks
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
    }
}

