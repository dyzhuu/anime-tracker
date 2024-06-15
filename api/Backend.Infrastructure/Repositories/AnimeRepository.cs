using Backend.Domain;
using Backend.Infrastructure.Contexts;
using Backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
	public class AnimeRepository : IAnimeRepository
	{
        private readonly DataContext _context;

        public AnimeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateAnime(Anime anime)
        {
            _context.Add(anime);
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<Anime> GetAnime(int id)
        {
            return await _context.Animes.Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<bool> AnimeExists(int id)
        {
            return await _context.Animes.AnyAsync(a => a.Id == id);
        }
    }
}

