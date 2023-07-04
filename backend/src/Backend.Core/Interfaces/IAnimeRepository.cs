using Backend.Core.Models;

namespace Backend.Core.Interfaces
{
	public interface IAnimeRepository
	{
		Anime GetAnime(int id);

        bool CreateAnime(Anime anime);

		bool AnimeExists(int id);
	}
}

