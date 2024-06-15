using AutoMapper;
using Backend.Domain;
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

        public async Task<bool> CreateAnime(AnimeDto animeDto)
        {
            return await _animeRepo.CreateAnime(_mapper.Map<Anime>(animeDto));
        }

        public async Task<AnimeDto> GetAnime(int id)
        {
            AnimeDto anime = _mapper.Map<AnimeDto>(await _animeRepo.GetAnime(id));
            return anime;
        }  
    }
}

 