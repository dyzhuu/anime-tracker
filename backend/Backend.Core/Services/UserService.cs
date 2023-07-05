using AutoMapper;
using Backend.Core.Dtos;
using Backend.Domain;
using Backend.Core.Interfaces;

namespace Backend.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepo = userRepository;
            _mapper = mapper;
        }

        public async Task<UserDto> RegisterUser(UserReqDto userReqDto)
        {
            
            userReqDto.Password = BCrypt.Net.BCrypt.HashPassword(userReqDto.Password);

            //FIXMEFIXMEFIXME
            User user = _mapper.Map<User>(userReqDto);
            return _mapper.Map<UserDto>(await _userRepo.RegisterUser(user));
        }

        public async Task<bool> VerificationSuccess(UserReqDto userReqDto)
        {
            User user = await _userRepo.GetUser(userReqDto.Username);
            return BCrypt.Net.BCrypt.Verify(userReqDto.Password, user.PasswordHash);
        }

        public async Task<bool> UpdateUser(UserDto userDto)
        {
            return await _userRepo.UpdateUser(_mapper.Map<User>(userDto));
        }

        public async Task<bool> DeleteUser(int userId)
        {
            User user = await _userRepo.GetUser(userId);
            return await _userRepo.DeleteUser(user);
        }

        public async Task<UserDto> GetUser(int userId)
        {
            User user = await _userRepo.GetUser(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUser(string username)
        {
            User user = await _userRepo.GetUser(username);
            UserDto userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<ICollection<UserDto>> GetUsers()
        {
            ICollection<User> users = await _userRepo.GetUsers();
            ICollection<UserDto> userDtos = _mapper.Map<List<UserDto>>(users);
            return userDtos;
        }

        public async Task<bool> UserExists(int userId)
        {
            return await _userRepo.UserExists(userId);
        }

        public async Task<bool> UserExists(string username)
        {
            return await _userRepo.UserExists(username);
        }
    }
}

