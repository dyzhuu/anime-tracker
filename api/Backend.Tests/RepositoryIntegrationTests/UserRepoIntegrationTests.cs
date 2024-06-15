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
        var dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new DataContext(dbContextOptions);

        _repository = new UserRepository(_context);
    }

    [TearDown]
    public void Cleanup()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task RegisterUser_AddsUserToDatabase()
    {
        // Arrange
        var user = MockData.GetMockUser();

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
        var user = MockData.GetMockUser();
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
             MockData.GetMockUser(1),
             MockData.GetMockUser(2)
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
        var user = MockData.GetMockUser();
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
        var user = MockData.GetMockUser();
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
        var user = MockData.GetMockUser();
        _context.Add(user);
        await _context.SaveChangesAsync();

        //Act
        var result = await _repository.DeleteUser(user);

        //Assert
        result.Should().BeTrue();
        _context.Users.Any(u => u.Id == 1).Should().BeFalse();
    }
}
