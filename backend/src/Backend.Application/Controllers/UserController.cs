using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
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
        public IActionResult CreateUser([FromQuery] string username, [FromQuery] string password)
        {
            if (username is null)
                return BadRequest();

            User user = _userService.GetUser(username);

            if (user != null)
                return BadRequest("Resource already exists");

            _userService.CreateUser(new User() { Username = username, Password = password });

            return CreatedAtAction(nameof(CreateUser), new { username = username, password = password} );
        }

        [HttpPut("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateUser(int userId, [FromBody] UserDto userDto)
        {
            if (userDto is null)
                return BadRequest();

            if (!_userService.UserExists(userId))
                return NotFound();

            if (!_userService.UpdateUser(userDto))
                return StatusCode(500, "Something went wrong"); ;

            return Ok();

        }

        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetUsers()
		{
            IEnumerable<User> users = _userService.GetUsers();

            return Ok(users);
		}

		[HttpGet("{userId}")]
		[ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetUser(int userId)
		{
			User user = _userService.GetUser(userId);

            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            if (!_userService.UserExists(userId))
                return NotFound();

            if (!_userService.DeleteUser(userId))
                return StatusCode(500, "Something went wrong"); ;

            return NoContent();
        }

        //Bookmarks

        [HttpGet("{userId}/shows")]
		[ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetBookmarks(int userId)
		{
			if (!_userService.UserExists(userId))
				return NotFound();

            IEnumerable<BookmarkDto> bookmarkDtos = _bookmarkService.GetBookmarks(userId);

			return Ok(bookmarkDtos);
		}

        [HttpPost("{userId}/shows")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult CreateBookmark(int userId, [FromQuery] int animeId, [FromBody] BookmarkDto bookmarkDto)
        {
            if (!_userService.UserExists(userId))
                return NotFound();

            if (bookmarkDto is null)
                return BadRequest();

            if (_bookmarkService.BookmarkExists(userId, animeId))
                return BadRequest("Bookmark already exists");

            if (!_bookmarkService.CreateBookmark(bookmarkDto))
                return StatusCode(500, "Something went wrong"); ;

            return CreatedAtAction(nameof(CreateBookmark), bookmarkDto);
        }

        [HttpPut("{userId}/shows/{animeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateBookmark(int userId, int animeId, [FromBody] BookmarkDto bookmarkDto)
        {
            if (bookmarkDto is null)
                return BadRequest();

            if (!_bookmarkService.BookmarkExists(userId, animeId))
                return NotFound();

            if (!_bookmarkService.UpdateBookmark(bookmarkDto))
                return StatusCode(500, "Something went wrong"); ;

            return Ok();
        }

        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [HttpDelete("{userId}/shows/{animeId}")]
        public IActionResult DeleteBookmark(int userId, int animeId)
        {
            if (!_bookmarkService.BookmarkExists(userId, animeId))
                return NotFound();

            if (!_bookmarkService.DeleteBookmark(userId, animeId))
                return StatusCode(500, "Something went wrong"); ;

            return NoContent();
        }
    }
}

