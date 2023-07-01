using System;
using Backend.Contexts;
using Backend.Models;

namespace Backend.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly DataContext _context;

		public UserRepository(DataContext context)
		{
			_context = context;
		}

        public SavedAnime GetSavedAnime(int id)
        {
            return _context.SavedAnimes.Where(a => a.AnimeId == id).FirstOrDefault();
        }

        public SavedAnime GetSavedAnime(string title)
        {
            return _context.SavedAnimes.Where(a => a.Anime.Title == title).FirstOrDefault();
        }

        public ICollection<SavedAnime> GetSavedAnimes()
        {
            return _context.SavedAnimes.OrderBy(a => a.AnimeId).ToList();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.UserName == username).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }
    }
}

