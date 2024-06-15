using Backend.Core.Dtos;
using Backend.Domain;
using Backend.Infrastructure.Contexts;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

[TestFixture]
public class BookmarkRepoIntegrationTests
{
    private BookmarkRepository _repository;
    private DataContext _context;

    [SetUp]
    public void Setup()
    {
        var dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new DataContext(dbContextOptions);

        _repository = new BookmarkRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task GetBookmarks_GetsBookmarksFromDatabase()
    {
        // Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "12345" };

        var bookmarks = new List<Bookmark>
        {
            new Bookmark { UserId = 1, AnimeId = 1, User = user, Anime = MockData.GetMockAnime(1), Rating = 10, Status = Status.Completed },
            new Bookmark { UserId = 1, AnimeId = 2, User = user, Anime = MockData.GetMockAnime(2), Rating = 0, Status = Status.PlanToWatch }
        };
        _context.Bookmarks.AddRange(bookmarks);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetBookmarks(1);

        // Assert
        result.Should().BeEquivalentTo(bookmarks);
    }

    [Test]
    public async Task BookmarkExists_ReturnTrue()
    {
        // Arrange
        var bookmark = MockData.GetMockBookmark();
        _context.Add(bookmark);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.BookmarkExists(1, 1);

        // Assert
        result.Should().BeTrue();
    }

    [Test]
    public async Task CreateBookmark_AddsBookmarkInDatabase()
    {
        // Arrange
        var bookmark = MockData.GetMockBookmark();

        // Act
        var result = await _repository.CreateBookmark(bookmark);

        // Assert
        result.Should().BeTrue();
        _context.Bookmarks.Should().Contain(bookmark);
    }

    [Test]
    public async Task UpdateBookmark_UpdatesBookmarkInDatabase()
    {
        //Arrange
        var bookmark = MockData.GetMockBookmark();
        _context.Add(bookmark);
        await _context.SaveChangesAsync();

        //Act
        bookmark.Rating = 9;
        var result = await _repository.UpdateBookmark(bookmark);

        //Assert
        result.Should().BeTrue();
        _context.Bookmarks
            .Where(b => b.UserId == 1)
            .Single(b => b.AnimeId == 1)
            .Rating.Should().Be(9);
    }

    [Test]
    public async Task DeleteBookmark_DeletesBookmarkFromDatabase()
    {
        //Arrange
        var bookmark = MockData.GetMockBookmark();
        _context.Add(bookmark);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.DeleteBookmark(bookmark);

        //Assert
        result.Should().BeTrue();
        _context.Bookmarks
            .Where(b => b.UserId == 1)
            .Any(b => b.AnimeId == 1)
            .Should().BeFalse();
    }
}
