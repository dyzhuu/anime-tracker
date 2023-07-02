using System;
using AutoMapper;
using Backend.Models;
using Backend.Dto;
using Backend.Repositories;

namespace Backend.Services
{
	public class AnimeService : IAnimeService
	{
		private readonly IAnimeRepository _animeRepo;
        private readonly IMapper _mapper;

        public AnimeService(IAnimeRepository animeRepository, IMapper mapper)
		{
			_animeRepo = animeRepository;
            _mapper = mapper;
        }

        public Anime CreateAnime(AnimeDto animeDto)
        {
            return _animeRepo.CreateAnime(_mapper.Map<Anime>(animeDto));
        }

        public AnimeDto GetAnime(int id)
        {
            AnimeDto anime = _mapper.Map<AnimeDto>(_animeRepo.GetAnime(id));
            return anime;
        }  
    }
}

 