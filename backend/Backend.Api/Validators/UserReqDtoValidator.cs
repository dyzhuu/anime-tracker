using Backend.Core.Dtos;
using FluentValidation;

namespace Backend.Api.Validators
{
    public class UserReqDtoValidator : AbstractValidator<UserReqDto>
    {
        public UserReqDtoValidator()
        {
            RuleFor(u => u.Username).NotEmpty().MaximumLength(30).Matches("^[a-zA-Z0-9-_]+$");
            RuleFor(u => u.Password).NotEmpty();
        }
    }

}

