using Backend.Core.Dtos;

namespace Backend.Core.Interfaces
{
    public interface IAnimeService
	{
        Task<AnimeDto> GetAnime(int id);

        Task<bool> CreateAnime(AnimeDto animeDto);
    }
}

