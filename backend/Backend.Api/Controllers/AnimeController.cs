using Backend.Core.Interfaces;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimeController : ControllerBase
	{

		private readonly IAnimeService _animeService;

		public AnimeController(IAnimeService animeService)
		{
			_animeService = animeService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAnime(int id)
		{
			AnimeDto anime = await _animeService.GetAnime(id);

			if (anime is null)
				return NotFound();

			return Ok(anime);
		}

		[HttpPost]
		[ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateAnime([FromBody] AnimeDto animeDto)
		{
			if (animeDto is null)
				return BadRequest();

			AnimeDto anime = await _animeService.GetAnime(animeDto.Id);

			if (anime != null)
				return BadRequest("Resource already exists");

			if (!await _animeService.CreateAnime(animeDto))
                return StatusCode(500, new { message = "Something went wrong" });

            return CreatedAtAction(nameof(CreateAnime), animeDto);
        }
    }
}

