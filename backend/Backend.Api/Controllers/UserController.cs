using Backend.Core.Interfaces;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
        private readonly IUserService _userService;
        private readonly IBookmarkService _bookmarkService;

        public UserController(IUserService userService, IBookmarkService bookmarkService)
		{
            _userService = userService;
            _bookmarkService = bookmarkService;
        }

        //FIXME: CHANGE TO LOGIN REGISTER LATER !!
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateUser([FromQuery] string username, [FromQuery] string password)
        {
            if (username is null)
                return BadRequest();

            if (await _userService.UserExists(username))
                return BadRequest("Resource already exists");

            await _userService.CreateUser(new UserDto() { Username = username, Password = password });

            return CreatedAtAction(nameof(CreateUser), new { username, password} );
        }

        [HttpPut("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserDto userDto)
        {
            if (userDto is null)
                return BadRequest();

            if (!await _userService.UserExists(userId))
                return NotFound();

            if (!await _userService.UpdateUser(userDto))
                return StatusCode(500, "Something went wrong"); ;

            return Ok();

        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
		{
            IEnumerable<UserDto> userDtos = await _userService.GetUsers();

            return Ok(userDtos);
		}

		[HttpGet("{userId}")]
		[ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetUser(int userId)
		{
			UserDto user = await _userService.GetUser(userId);

            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            if (!await _userService.UserExists(userId))
                return NotFound();

            if (!await _userService.DeleteUser(userId))
                return StatusCode(500, "Something went wrong"); ;

            return NoContent();
        }

        //Bookmarks

        [HttpGet("{userId}/shows")]
		[ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetBookmarks(int userId)
		{
			if (!await _userService.UserExists(userId))
				return NotFound();

            IEnumerable<BookmarkDto> bookmarkDtos = await _bookmarkService.GetBookmarks(userId);

			return Ok(bookmarkDtos);
		}

        [HttpPost("{userId}/shows")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateBookmark(int userId, [FromQuery] int animeId, [FromBody] BookmarkDto bookmarkDto)
        {
            if (!await _userService.UserExists(userId))
                return NotFound();

            if (bookmarkDto is null)
                return BadRequest();

            if (await _bookmarkService.BookmarkExists(userId, animeId))
                return BadRequest("Bookmark already exists");

            if (!await _bookmarkService.CreateBookmark(bookmarkDto))
                return StatusCode(500, "Something went wrong"); ;

            return CreatedAtAction(nameof(CreateBookmark), bookmarkDto);
        }

        [HttpPut("{userId}/shows/{animeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UpdateBookmark(int userId, int animeId, [FromBody] BookmarkDto bookmarkDto)
        {
            if (bookmarkDto is null)
                return BadRequest();

            if (!await _bookmarkService.BookmarkExists(userId, animeId))
                return NotFound();

            if (!await _bookmarkService.UpdateBookmark(bookmarkDto))
                return StatusCode(500, "Something went wrong"); ;

            return Ok();
        }

        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [HttpDelete("{userId}/shows/{animeId}")]
        public async Task<IActionResult> DeleteBookmark(int userId, int animeId)
        {
            if (!await _bookmarkService.BookmarkExists(userId, animeId))
                return NotFound();

            if (!await _bookmarkService.DeleteBookmark(userId, animeId))
                return StatusCode(500, "Something went wrong"); ;

            return NoContent();
        }
    }
}

