using Backend.Domain;
using Backend.Infrastructure.Contexts;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

[TestFixture]
public class AnimeRepoIntegrationTests
{
    private AnimeRepository _repository;
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
        _repository = new AnimeRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        // Clean up the test database by removing all records and disposing the DataContext
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task CreateAnime_AddsAnimeToDatabase()
    {
        // Arrange
        var anime = new Anime { Id = 1, Title = "Cowboy Bebop", Description = "description", ImageURL = "www" };

        // Act
        var result = await _repository.CreateAnime(anime);

        // Assert
        result.Should().BeTrue();
        _context.Animes.Should().Contain(anime);
    }

    [Test]
    public async Task GetAnime_ExistingId_ReturnsAnime()
    {
        // Arrange
        var anime = new Anime { Id = 1, Title = "Cowboy Bebop", Description = "description", ImageURL = "www" };
        _context.Animes.Add(anime);
        _context.SaveChanges();

        // Act
        var result = await _repository.GetAnime(1);

        // Assert
        result.Should().Be(anime);
    }

    [Test]
    public async Task AnimeExists_ExistingId_ReturnsTrue()
    {
        // Arrange
        var anime = new Anime { Id = 1, Title = "Cowboy Bebop", Description = "description", ImageURL = "www" };
        _context.Animes.Add(anime);
        _context.SaveChanges();

        // Act
        var result = await _repository.AnimeExists(1);

        // Assert
        result.Should().BeTrue();
    }
}
