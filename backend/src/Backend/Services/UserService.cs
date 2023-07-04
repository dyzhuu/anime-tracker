using System;
using AutoMapper;
using Backend.Dtos;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
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
        public bool CreateUser(User user)
        {
            return _userRepo.CreateUser(user);
        }

        public bool UpdateUser(UserDto userDto)
        {
            return _userRepo.UpdateUser(_mapper.Map<User>(userDto));
        }

        public bool DeleteUser(int userId)
        {
            User user = GetUser(userId);
            return _userRepo.DeleteUser(user);
        }

        public User GetUser(int userId)
        {
            return _userRepo.GetUser(userId);
        }

        public User GetUser(string username)
        {
            return _userRepo.GetUser(username);
        }

        public ICollection<User> GetUsers()
        {
            return _userRepo.GetUsers();
        }

        public bool UserExists(int userId)
        {
            return _userRepo.UserExists(userId);
        }
    }
}

