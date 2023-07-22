using Backend.Domain;

namespace Backend.Core.Interfaces
{
	public interface IAnimeRepository
	{
		Task<Anime> GetAnime(int id);

        Task<bool> CreateAnime(Anime anime);

        Task<bool> AnimeExists(int id);
	}
}

