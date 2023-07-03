using System;
using Backend.Services;
using Backend.Models;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
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
		public IActionResult getAnime(int id)
		{
			AnimeDto anime = _animeService.GetAnime(id);

			if (anime is null)
				return NotFound();

			return Ok(anime);
		}

		[HttpPost]
		[ProducesResponseType(201)]
		public IActionResult CreateAnime([FromBody] AnimeDto animeDto)
		{
			if (animeDto is null)
				return BadRequest();

			AnimeDto anime = _animeService.GetAnime(animeDto.Id);

			if (anime != null)
				return BadRequest("Resource already exists");

			if (!_animeService.CreateAnime(animeDto))
                return StatusCode(500, new { message = "Something went wrong" });

            return CreatedAtAction(nameof(CreateAnime), animeDto);
        }
    }
}

