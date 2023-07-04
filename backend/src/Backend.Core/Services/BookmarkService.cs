using AutoMapper;
using Backend.Core.Dtos;
using Backend.Core.Models;
using Backend.Core.Interfaces;

namespace Backend.Core.Services
{
	public class BookmarkService : IBookmarkService
	{
        private readonly IBookmarkRepository _bookmarkRepo;
        private readonly IAnimeRepository _animeRepo;
        private readonly IMapper _mapper;

        public BookmarkService(IBookmarkRepository bookmarkRepository, IAnimeRepository animeRepository, IMapper mapper)
        {
            _bookmarkRepo = bookmarkRepository;
            _animeRepo = animeRepository;
            _mapper = mapper;
        }

        public Bookmark GetBookmark(int userId, int animeId)
        {
            return _bookmarkRepo.GetBookmark(userId, animeId);
        }

        public ICollection<BookmarkDto> GetBookmarks(int userId)
        {
            ICollection<BookmarkDto> bookmarks = _mapper.Map<List<BookmarkDto>>(_bookmarkRepo.GetBookmarks(userId));

            return bookmarks;
        }

        public bool BookmarkExists(int userId, int animeId)
        {
            return _bookmarkRepo.BookmarkExists(userId, animeId);
        }

        public bool CreateBookmark(BookmarkDto bookmarkDto)
        {
            if (!_animeRepo.AnimeExists(bookmarkDto.AnimeId))
                if (!_animeRepo.CreateAnime(_mapper.Map<Anime>(bookmarkDto)))
                    return false;

            Bookmark bookmark = _mapper.Map<Bookmark>(bookmarkDto);

            return _bookmarkRepo.CreateBookmark(bookmark);
        }

        public bool UpdateBookmark(BookmarkDto bookmarkDto)
        {
            return _bookmarkRepo.UpdateBookmark(bookmarkDto);
        }

        public bool DeleteBookmark(int userId, int animeId)
        {
            Bookmark bookmark = GetBookmark(userId, animeId);
            return _bookmarkRepo.DeleteBookmark(bookmark);
        }
    }
}

