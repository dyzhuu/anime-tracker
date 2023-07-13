using Backend.Core.Dtos;
using Backend.Domain;

namespace Backend.Tests
{
    public static class MockData
    {
        public static AnimeDto GetMockAnimeDto(int id = 1)
        {
            return new AnimeDto
            {
                Id = id,
                Title = "Mock Anime",
                ImageURL = "https://example.com/anime.jpg",
                Description = "This is a mock anime."
            };
        }

        public static Anime GetMockAnime(int id = 1)
        {
            return new Anime
            {
                Id = id,
                Title = "Mock Anime",
                ImageURL = "https://example.com/anime.jpg",
                Description = "This is a mock anime.",
                Bookmarks = new List<Bookmark>()
            };
        }

        public static BookmarkDto GetMockBookmarkDto(int userId = 1, int animeId = 1)
        {
            return new BookmarkDto
            {
                UserId = userId,
                AnimeId = animeId,
                Title = "Mock Bookmark",
                ImageURL = "https://example.com/anime.jpg",
                Description = "This is a mock bookmark.",
                Rating = 5,
                Status = Status.Watching
            };
        }

        public static Bookmark GetMockBookmark(int userId = 1, int animeId = 1 )
        {
            return new Bookmark
            {
                UserId = userId,
                AnimeId = animeId,
                User = GetMockUser(userId),
                Anime = GetMockAnime(animeId),
                Rating = 5,
                Status = Status.Watching
            };
        }

        public static UserDto GetMockUserDto(int id = 1)
        {
            return new UserDto
            {
                Id = id,
                Username = "mockuser",
                Password = "mockpassword"
            };
        }

        public static User GetMockUser(int id = 1)
        {
            return new User
            {
                Id = id,
                Username = "mockuser",
                PasswordHash = "mockpasswordhash",
                Bookmarks = new List<Bookmark>()
            };
        }
    }
}

