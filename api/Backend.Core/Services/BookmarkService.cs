using AutoMapper;
using Backend.Core.Dtos;
using Backend.Domain;
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

        public async Task<BookmarkDto> GetBookmark(int userId, int animeId)
        {
            Bookmark bookmark = await _bookmarkRepo.GetBookmark(userId, animeId);
            BookmarkDto bookmarkDto = _mapper.Map<BookmarkDto>(bookmark);
            return bookmarkDto;
        }

        public async Task<ICollection<BookmarkDto>> GetBookmarks(int userId)
        {
            ICollection<Bookmark> bookmarks = await _bookmarkRepo.GetBookmarks(userId);
            ICollection<BookmarkDto> bookmarkDtos = _mapper.Map<List<BookmarkDto>>(bookmarks);

            return bookmarkDtos;
        }

        public async Task<bool> BookmarkExists(int userId, int animeId)
        {
            return await _bookmarkRepo.BookmarkExists(userId, animeId);
        }

        public async Task<bool> CreateBookmark(BookmarkDto bookmarkDto)
        {
            if (!await _animeRepo.AnimeExists(bookmarkDto.AnimeId))
                if (!await _animeRepo.CreateAnime(_mapper.Map<Anime>(bookmarkDto)))
                    return false;

            Bookmark bookmark = _mapper.Map<Bookmark>(bookmarkDto);

            return await _bookmarkRepo.CreateBookmark(bookmark);
        }

        public async Task<bool> UpdateBookmark(BookmarkDto bookmarkDto)
        {
            return await _bookmarkRepo.UpdateBookmark(_mapper.Map<Bookmark>(bookmarkDto));
        }

        public async Task<bool> DeleteBookmark(int userId, int animeId)
        {
            Bookmark bookmark = await _bookmarkRepo.GetBookmark(userId, animeId);
            return await _bookmarkRepo.DeleteBookmark(bookmark);
        }
    }
}

