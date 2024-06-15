using AutoMapper;
using Backend.Core.Interfaces;
using Backend.Core.Services;
using Backend.Domain;

namespace Backend.Tests.ServiceUnitTests
{
    [TestFixture]
    public class BookmarkServiceTests
    {
        private IAnimeRepository _animeRepository;
        private IBookmarkRepository _bookmarkRepository;
        private IMapper _mapper;
        private BookmarkService _bookmarkService;

        [SetUp]
        public void SetUp()
        {
            _bookmarkRepository = Substitute.For<IBookmarkRepository>();
            _animeRepository = Substitute.For<IAnimeRepository>();
            _mapper = Substitute.For<IMapper>();
            _bookmarkService = new BookmarkService(_bookmarkRepository, _animeRepository, _mapper);
        }

        [Test]
        public async Task CreateBookmark_AnimeExists_ReturnsTrue()
        {
            // Arrange
            var bookmarkDto = MockData.GetMockBookmarkDto();

            _animeRepository.AnimeExists(bookmarkDto.AnimeId).Returns(true);
            _mapper.Map<Bookmark>(bookmarkDto).Returns(new Bookmark());
            _bookmarkRepository.CreateBookmark(Arg.Any<Bookmark>()).Returns(true);

            // Act
            var result = await _bookmarkService.CreateBookmark(bookmarkDto);

            // Assert
            result.Should().BeTrue();
            await _animeRepository.Received(0).CreateAnime(Arg.Any<Anime>());
            await _bookmarkRepository.Received(1).CreateBookmark(Arg.Any<Bookmark>());
        }

        [Test]
        public async Task CreateBookmark_AnimeDoesNotExist_CreatesAnimeAndReturnsTrue()
        {
            // Arrange
            var bookmarkDto = MockData.GetMockBookmarkDto();

            _animeRepository.AnimeExists(bookmarkDto.AnimeId).Returns(false);
            _mapper.Map<Anime>(bookmarkDto).Returns(new Anime());
            _animeRepository.CreateAnime(Arg.Any<Anime>()).Returns(true);
            _mapper.Map<Bookmark>(bookmarkDto).Returns(new Bookmark());
            _bookmarkRepository.CreateBookmark(Arg.Any<Bookmark>()).Returns(true);

            // Act
            var result = await _bookmarkService.CreateBookmark(bookmarkDto);

            // Assert
            result.Should().BeTrue();
            await _animeRepository.Received(1).CreateAnime(Arg.Any<Anime>());
            await _bookmarkRepository.Received(1).CreateBookmark(Arg.Any<Bookmark>());
        }

    }
}
