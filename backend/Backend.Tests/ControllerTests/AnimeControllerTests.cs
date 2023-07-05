using Backend.Api.Controllers;
using Backend.Core.Dtos;
using Backend.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Tests.Controllers
{
    [TestFixture]
    public class AnimeControllerTests
    {
        private AnimeController _controller;
        private IAnimeService _animeService;

        [SetUp]
        public void Setup()
        {
            _animeService = Substitute.For<IAnimeService>();
            _controller = new AnimeController(_animeService);
        }

        [Test]
        public async Task GetAnime_WithValidId_ReturnsOkResult()
        {
            // Arrange
            int animeId = 1;
            var expectedAnime = new AnimeDto { Id = animeId, Title = "Example Anime", ImageURL = "Example URL", Description = "Example Description"};
            _animeService.GetAnime(animeId).Returns(expectedAnime);

            // Act
            var result = await _controller.GetAnime(animeId);

            // Assert
            result.Should().BeOfType<OkObjectResult>()
                .Which.Value.Should().BeEquivalentTo(expectedAnime);
        }

        [Test]
        public async Task GetAnime_WithInvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            int animeId = 1;
            _animeService.GetAnime(animeId).Returns((AnimeDto)null);

            // Act
            var result = await _controller.GetAnime(animeId);

            // Assert
            result.Should().BeOfType<NotFoundResult>();
        }

        [Test]
        public async Task CreateAnime_WithValidDto_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var animeDto = new AnimeDto { Id = 1, Title = "Example Anime", ImageURL = "Example URL", Description = "Example Description" };
            _animeService.GetAnime(animeDto.Id).Returns((AnimeDto)null);
            _animeService.CreateAnime(animeDto).Returns(true);

            // Act
            var result = await _controller.CreateAnime(animeDto);

            // Assert
            result.Should().BeOfType<CreatedAtActionResult>()
                .Which.Value.Should().BeEquivalentTo(animeDto);
        }

        [Test]
        public async Task CreateAnime_WithNullDto_ReturnsBadRequestResult()
        {
            // Arrange
            AnimeDto animeDto = null;

            // Act
            var result = await _controller.CreateAnime(animeDto);

            // Assert
            result.Should().BeOfType<BadRequestResult>();
        }

        [Test]
        public async Task CreateAnime_WithExistingAnime_ReturnsBadRequestResult()
        {
            // Arrange
            var animeDto = new AnimeDto { Id = 1, Title = "Example Anime", ImageURL = "Example URL", Description = "Example Description" };
            _animeService.GetAnime(animeDto.Id).Returns(animeDto);

            // Act
            var result = await _controller.CreateAnime(animeDto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>()
                .Which.Value.Should().Be("Resource already exists");
        }

        [Test]
        public async Task CreateAnime_WithServiceFailure_ReturnsInternalServerErrorResult()
        {
            // Arrange
            var animeDto = new AnimeDto { Id = 1, Title = "Example Anime", ImageURL = "Example URL", Description = "Example Description" };
            _animeService.GetAnime(animeDto.Id).Returns((AnimeDto)null);
            _animeService.CreateAnime(animeDto).Returns(false);

            // Act
            var result = await _controller.CreateAnime(animeDto);

            // Assert
            result.Should().BeOfType<ObjectResult>()
                .Which.StatusCode.Should().Be(500);
        }
    }
}
