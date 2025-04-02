using FluentValidation;
using Backend.DTOs;

namespace Backend.Validators
{
    public class UserProfileDtoValidator : AbstractValidator<UserProfileDto>
    {
        public UserProfileDtoValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Invalid user ID");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(100).WithMessage("Email cannot exceed 100 characters");
                
            RuleForEach(x => x.Roles)
                .NotEmpty().WithMessage("Role cannot be empty")
                .MaximumLength(50).WithMessage("Role name cannot exceed 50 characters");
        }
    }
} 