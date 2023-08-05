using AutoMapper;
using Backend.Core.Interfaces;
using Backend.Core.Services;

namespace Backend.Tests.ServiceUnitTests
{
    [TestFixture]
    public class UserServiceTests
    {
        private IUserRepository _userRepo;
        private IExternalUserMappingRepository _userMappingRepo;
        private IMapper _mapper;
        private UserService _userService;

        [SetUp]
        public void SetUp()
        {
            _userRepo = Substitute.For<IUserRepository>();
            _userMappingRepo = Substitute.For<IExternalUserMappingRepository>();
            _mapper = Substitute.For<IMapper>();
            _userService = new UserService(_userRepo, _mapper, _userMappingRepo);
        }

        [Test]
        public async Task GetUniqueUsername_ShouldGenerateUniqueUsername()
        {
            // Arrange
            string originalUsername = "username";
            string generatedUsername1 = "username1";
            string generatedUsername2 = "username2";

            _userRepo.UserExists(originalUsername).Returns(true);
            _userRepo.UserExists(generatedUsername1).Returns(false, true);

            // Act
            string result1 = await _userService.GetUniqueUsername(originalUsername);
            string result2 = await _userService.GetUniqueUsername(originalUsername);

            // Assert
            result1.Should().Be(generatedUsername1);
            result2.Should().Be(generatedUsername2);
        }

        [Test]
        public async Task GetUniqueUsername_ShouldReturnSameUsername_IfNotAlreadyExists()
        {
            // Arrange
            string username = "username";

            _userRepo.UserExists(username).Returns(false);

            // Act
            string result = await _userService.GetUniqueUsername(username);

            // Assert
            result.Should().Be(username);
        }
    }
}
