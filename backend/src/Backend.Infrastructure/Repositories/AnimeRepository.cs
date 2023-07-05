using Backend.Domain;
using Backend.Infrastructure.Contexts;
using Backend.Core.Interfaces;

namespace Backend.Infrastructure.Repositories
{
	public class AnimeRepository : IAnimeRepository
	{
        private readonly DataContext _context;

        public AnimeRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateAnime(Anime anime)
        {
            _context.Add(anime);
            return _context.SaveChanges() > 0 ? true : false;
        }

        public Anime GetAnime(int id)
        {
            return _context.Animes.Where(a => a.Id == id).FirstOrDefault();
        }

        public bool AnimeExists(int id)
        {
            return _context.Animes.Any(a => a.Id == id);
        }
    }
}

