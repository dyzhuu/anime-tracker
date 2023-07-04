using System;
using Backend.Models;
using Backend.Dtos;

namespace Backend.Services
{
	public interface IAnimeService
	{
        AnimeDto GetAnime(int id);

        bool CreateAnime(AnimeDto animeDto);
    }
}

