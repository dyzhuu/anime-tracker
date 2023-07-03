using System;
using Backend.Contexts;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        //scuffed CHANGE TO LOGIN AND REGISTER
        public bool CreateUser(User user)
        {
            _context.Add(user);
            return _context.SaveChanges() > 0 ? true : false;
        }

        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return _context.SaveChanges() > 0 ? true : false;
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public User GetUser(int userId)
        {
            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public bool UserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return _context.SaveChanges() > 0 ? true : false;
        }
    }
}

