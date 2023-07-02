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

        public User CreateUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }

        public Bookmark GetBookmark(int animeId, int userId)
        {
            return _context.Bookmarks.Where(a => a.AnimeId == animeId).Where(u => u.User.Id == userId).FirstOrDefault();
        }

        public ICollection<Bookmark> GetBookmarks(int userId)
        {
            return _context.Bookmarks.Where(b => b.User.Id == userId).Include(b => b.Anime).OrderBy(b => b.Anime.Title).ToList();
        }

        public User GetUser(int userId)
        {
            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public bool UserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        public bool CreateBookmark(Bookmark bookmark)
        {
            _context.Add(bookmark);
            return _context.SaveChanges() > 0 ? true : false;
        }

    }
}

