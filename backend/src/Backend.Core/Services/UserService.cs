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

        //FIXME scuffed
        public bool CreateUser(UserDto userDto)
        {
            return _userRepo.CreateUser(_mapper.Map<User>(userDto));
        }

        public bool UpdateUser(UserDto userDto)
        {
            return _userRepo.UpdateUser(_mapper.Map<User>(userDto));
        }

        public bool DeleteUser(int userId)
        {
            User user = _userRepo.GetUser(userId);
            return _userRepo.DeleteUser(user);
        }

        public UserDto GetUser(int userId)
        {
            User user = _userRepo.GetUser(userId);
            return _mapper.Map<UserDto>(user);
        }

        public UserDto GetUser(string username)
        {
            UserDto userDto = _mapper.Map<UserDto>(_userRepo.GetUser(username));
            return userDto;
        }

        public ICollection<UserDto> GetUsers()
        {
            ICollection<UserDto> userDtos = _mapper.Map<List<UserDto>>(_userRepo.GetUsers());
            return userDtos;
        }

        public bool UserExists(int userId)
        {
            return _userRepo.UserExists(userId);
        }

        public bool UserExists(string username)
        {
            return _userRepo.UserExists(username);
        }
    }
}

