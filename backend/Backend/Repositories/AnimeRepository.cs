using System;
using Backend.Models;
using Backend.Contexts;

namespace Backend.Repositories
{
	public class AnimeRepository : IAnimeRepository
	{
        private readonly DataContext _context;

        public AnimeRepository(DataContext context)
        {
            _context = context;

        }

        public Anime CreateAnime(Anime anime)
        {
            _context.Add(anime);
            _context.SaveChanges();
            return anime;
        }

        public Anime GetAnime(int id)
        {
            return _context.Animes.Where(a => a.Id == id).FirstOrDefault();
        }
    }
}

