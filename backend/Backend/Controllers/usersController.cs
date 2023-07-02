using System;
using Backend.Services;
using Backend.Models;
using Backend.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
        private readonly IUserService _userService;

        public UserController(IUserService userService)
		{
            _userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        public IActionResult CreateUser([FromBody] UserDto userDto)
        {
            if (userDto is null)
                return BadRequest();

            User user = _userService.GetUser(userDto.Username);

            if (user != null)
                return BadRequest("Resource already exists");

            if (!ModelState.IsValid)
                return BadRequest();

            _userService.CreateUser(userDto);

            return CreatedAtAction(nameof(CreateUser), userDto);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetUsers()
		{
			IEnumerable<User> users = _userService.GetUsers();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
		}

		[HttpGet("{userId}")]
		[ProducesResponseType(200)]
		public IActionResult GetUser(int userId)
		{
			User user = _userService.GetUser(userId);

			if (user is null)
				return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
		}

        [HttpGet("{userId}/shows")]
		[ProducesResponseType(200)]
		public IActionResult GetBookmarks(int userId)
		{
			if (!_userService.UserExists(userId))
				return NotFound();

			IEnumerable<BookmarkDto> bookmarkDtos = _userService.GetBookmarks(userId);

            if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(bookmarkDtos);
		}

        [HttpPost("{userId}/shows")]
        [ProducesResponseType(201)]
        public IActionResult CreateBookmark(int userId, [FromQuery] int animeId, [FromBody] BookmarkDto bookmarkDto)
        {
            if (!_userService.UserExists(userId))
                return NotFound();

            if (bookmarkDto is null)
                return BadRequest();

            Bookmark bookmark = _userService.GetBookmark(animeId, userId);
                
            if (bookmark != null)
                return BadRequest("Resource already exists");

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_userService.CreateBookmark(userId, animeId, bookmarkDto))
                return StatusCode(500, new { message = "Something went wrong" });

            return CreatedAtAction(nameof(CreateBookmark), bookmarkDto);
        }
    }
}

