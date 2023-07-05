using Microsoft.AspNetCore.Mvc;
using Backend.Core.Dtos;
using Backend.Core.Interfaces;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, IConfiguration configuration) {
            _userService = userService;
            _configuration = configuration;
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

            string token = CreateToken(userDto);

            return Ok(token);
        }

        private string CreateToken(UserDto userDto)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, userDto.Id.ToString()),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
     

}

