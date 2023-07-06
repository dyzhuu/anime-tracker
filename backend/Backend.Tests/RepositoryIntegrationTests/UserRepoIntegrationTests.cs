using Backend.Domain;
using Backend.Infrastructure.Contexts;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

[TestFixture]
public class UserRepoIntegrationTests
{
    private UserRepository _repository;
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
        _repository = new UserRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        // Clean up the test database by removing all records and disposing the DataContext
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task RegisterUser_AddsUserToDatabase()
    {
        // Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "password" };

        // Act
        var result = await _repository.RegisterUser(user);

        // Assert
        result.Should().Be(user);
        _context.Users.Should().Contain(user);
    }

    [Test]
    public async Task UpdateUser_UpdatesUserInDatabase()
    {
        //Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "password" };
        _context.Add(user);
        await _context.SaveChangesAsync();

        //Act
        user.PasswordHash = "newPassword";
        var result = await _repository.UpdateUser(user);

        //Assert
        result.Should().BeTrue();
        _context.Users.Single(u => u.Id == 1).PasswordHash.Should().Be("newPassword");
    }

    [Test]
    public async Task GetUsers_ReturnsUsers()
    {
        //Arrange
        var users = new List<User>
        {
             new User { Id = 1, Username = "David", PasswordHash = "password" },
             new User { Id = 2, Username = "Zhu", PasswordHash = "password" }
        };
        _context.Users.AddRange(users);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.GetUsers();

        //Assert
        result.Should().BeEquivalentTo(users);
    }

    [Test]
    public async Task GerUserById_ReturnsUser()
    {
        //Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "password" };
        _context.Add(user);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.GetUser(1);

        //Assert
        result.Should().Be(user);
    }

    [Test]
    public async Task UserExistsById_ReturnsTrue()
    {
        //Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "password" };
        _context.Add(user);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.UserExists(1);

        //Assert
        result.Should().BeTrue();
    }

    [Test]
    public async Task DeleteUser_DeletesUserFromDatabase()
    {
        //Arrange
        var user = new User { Id = 1, Username = "David", PasswordHash = "password" };
        _context.Add(user);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.DeleteUser(user);

        //Assert
        result.Should().BeTrue();
        _context.Users.Any(u => u.Id == 1).Should().BeFalse();
    }
}
