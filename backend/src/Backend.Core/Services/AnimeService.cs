using AutoMapper;
using Backend.Core.Models;
using Backend.Core.Dtos;
using Backend.Core.Interfaces;

namespace Backend.Core.Services
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

        public bool CreateAnime(AnimeDto animeDto)
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

 