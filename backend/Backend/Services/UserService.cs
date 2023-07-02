using System;
using AutoMapper;
using Backend.Dto;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IAnimeRepository _animeRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IAnimeRepository animeRepository, IMapper mapper)
        {
            _userRepo = userRepository;
            _animeRepo = animeRepository;
            _mapper = mapper;
        }

        public User CreateUser(UserDto userDto)
        {
            return _userRepo.CreateUser(_mapper.Map<User>(userDto));
        }

        public Bookmark GetBookmark(int animeId, int userId)
        {
            return _userRepo.GetBookmark(animeId, userId);
        }

        public ICollection<BookmarkDto> GetBookmarks(int userId)
        {
            ICollection<BookmarkDto> bookmarks = _mapper.Map<List<BookmarkDto>>(_userRepo.GetBookmarks(userId));

            //ICollection<Bookmark> books = _userRepo.GetBookmarks(userId);
            //List<BookmarkDto> bookmarkDtos = new List<BookmarkDto>();
            //foreach (Bookmark book in books)
            //{
            //    bookmarkDtos.Add(new BookmarkDto
            //    {
            //        Title = book.Anime.Title,
            //        ImageURL = book.Anime.ImageURL,
            //        Description = book.Anime.Description,
            //        Review = book.Review,
            //        Status = book.Status
            //    });
            //}

            return bookmarks;
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
         
        public bool CreateBookmark(int userID, int animeId, BookmarkDto bookmarkDto)
        {
            User user = _userRepo.GetUser(userID);
            Anime anime = _animeRepo.GetAnime(animeId);
            if (anime is null)
            {
                anime = new Anime() { Id = animeId };
                anime = _animeRepo.CreateAnime(_mapper.Map<Anime>(bookmarkDto));
            }

            Bookmark bookmark = new Bookmark
            {
                UserId = userID,
                AnimeId = animeId,
                User = user,
                Anime = anime,
                Review = bookmarkDto.Review,
                Status = bookmarkDto.Status
            };

            return _userRepo.CreateBookmark(bookmark);
        }

    }
}

