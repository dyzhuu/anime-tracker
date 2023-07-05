using Microsoft.AspNetCore.Mvc;
using Backend.Core.Dtos;
using Backend.Core.Interfaces;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService) {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserReqDto userReqDto)
        {
            if (userReqDto is null) 
                return BadRequest();
            if (await _userService.UserExists(userReqDto.Username))
                return BadRequest("Username already exists");

                //TODO: add validation logic
                UserDto user = await _userService.RegisterUser(userReqDto);
            if (user is null) 
                return BadRequest("Invalid credentials");
            
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserReqDto userReqDto)
        {
            UserDto userDto = await _userService.GetUser(userReqDto.Username);

            if (userDto is null)
                return BadRequest("User not found");

            //FIXME service layer
            if (!await _userService.VerificationSuccess(userReqDto))
                return BadRequest("Invalid credentials");

            return Ok(userDto);
        }
    }


}

