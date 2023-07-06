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
        // Set up the in-memory database options
        var dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        // Create a new instance of DataContext using the in-memory database options
        _context = new DataContext(dbContextOptions);

        // Initialize the repository with the DataContext
        _repository = new BookmarkRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        // Clean up the test database by removing all records and disposing the DataContext
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task GetBookmarks_GetsBookmarksFromDatabase()
    {
        // Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "12345" };
        var CowboyBebop = new Anime { Id = 1, Title = "CowboyBebop", Description = "description", ImageURL = "www" };
        var Naruto = new Anime { Id = 2, Title = "Naruto", Description = "description", ImageURL = "www" };

        var bookmarks = new List<Bookmark>
        {
            new Bookmark { UserId = 1, AnimeId = 1, User = user, Anime = CowboyBebop, Rating = 10, Status = Status.Completed },
            new Bookmark { UserId = 1, AnimeId = 2, User = user, Anime = Naruto, Rating = 0, Status = Status.PlanToWatch }
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
        var bookmark = new Bookmark { UserId = 1, AnimeId = 1, Rating = 10, Status = Status.Completed };
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
        var bookmark = new Bookmark { UserId = 1, AnimeId = 1, Rating = 10, Status = Status.Completed };

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
        var bookmark = new Bookmark { UserId = 1, AnimeId = 1, Rating = 10, Status = Status.Completed };
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
        var bookmark = new Bookmark { UserId = 1, AnimeId = 1, Rating = 10, Status = Status.Completed };
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
