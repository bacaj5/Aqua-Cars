using AquaCars.DTOs.IdentityDTOs;
using FluentValidation;

namespace AquaCars.Validations.IdentityValidations
{
    public class LoginDTOValidator : AbstractValidator<LoginDTO>
    {
        public LoginDTOValidator() 
        { 
            RuleFor(x=> x.Email).NotEmpty().WithMessage("The Email Can't be Null.");
            RuleFor(x=> x.Password).NotEmpty().WithMessage("The Password Can't be Null.");
        }

    }
}
