using Microsoft.AspNetCore.Mvc;
using Backend.Core.Dtos;
using Backend.Core.Interfaces;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
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

                //TODO: add validation logic with fluent validation
                UserDto user = await _userService.RegisterUser(userReqDto);
            if (user is null) 
                return BadRequest("Invalid credentials");
            
            return Ok(user);
        }

        [HttpPost("oauth2")]
        public async Task<IActionResult> RegisterFromExternalId([FromBody] ExternalRegistrationDto externalRegistrationDto)
        {
            
            if (externalRegistrationDto.ExternalId == null || externalRegistrationDto.Username == null)
            {
                return BadRequest();
            }
            UserDto userDto = await _userService.CreateUserFromExternalId(externalRegistrationDto.ExternalId, externalRegistrationDto.Username);

            return Ok(userDto);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserReqDto userReqDto)
        {
            if (userReqDto.Password == null)
            {
                return BadRequest("Invaslid credentials");
            }

            UserDto userDto = await _userService.GetUser(userReqDto.Username);

            if (userDto == null)
                return BadRequest("User not found");

            if (!await _userService.VerificationSuccess(userReqDto))
                return BadRequest("Invalid credentials");

            //string token = CreateToken(userDto);

            return Ok(new { id = userDto.Id, username = userDto.Username });
        }

        [Authorize]
        [HttpPost("verify")]
        public IActionResult Verify()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(new { id = userId });
        }

        private string CreateToken(UserDto userDto)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, userDto.Id.ToString()),
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

