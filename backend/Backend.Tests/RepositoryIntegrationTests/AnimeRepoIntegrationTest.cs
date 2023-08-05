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
        var dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new DataContext(dbContextOptions);

        _repository = new AnimeRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task CreateAnime_AddsAnimeToDatabase()
    {
        // Arrange
        var anime = MockData.GetMockAnime();

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
        var anime = MockData.GetMockAnime();
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
        var anime = MockData.GetMockAnime();
        _context.Animes.Add(anime);
        _context.SaveChanges();

        // Act
        var result = await _repository.AnimeExists(1);

        // Assert
        result.Should().BeTrue();
    }
}
