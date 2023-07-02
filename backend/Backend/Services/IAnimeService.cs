using System;
using Backend.Models;
using Backend.Dto;

namespace Backend.Services
{
	public interface IAnimeService
	{
        AnimeDto GetAnime(int id);

        Anime CreateAnime(AnimeDto animeDto);
    }
}

