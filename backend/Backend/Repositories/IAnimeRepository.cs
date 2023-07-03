using System;
using Backend.Models;

namespace Backend.Repositories
{
	public interface IAnimeRepository
	{
		Anime GetAnime(int id);

        bool CreateAnime(Anime anime);

		bool AnimeExists(int id);
	}
}

