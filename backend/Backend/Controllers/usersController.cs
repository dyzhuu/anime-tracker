using System;
using Backend.Repositories;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AnimeController : ControllerBase
	{
        private readonly IAnimeRepository _animeRepository;

        public AnimeController(IAnimeRepository animeRepository)
		{
            _animeRepository = animeRepository;
        }

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Anime>))]
		public IActionResult GetAnimes()
		{
			var animes = _animeRepository.GetAnimes();

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(animes);
		}
	}
}

