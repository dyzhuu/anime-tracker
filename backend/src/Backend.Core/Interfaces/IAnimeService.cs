using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IAnimeService
	{
        AnimeDto GetAnime(int id);

        bool CreateAnime(AnimeDto animeDto);
    }
}

