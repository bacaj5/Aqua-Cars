using AquaCars.DTOs.IdentityDTOs;
using FluentValidation;

namespace AquaCars.Validations.IdentityValidations
{
    public class RegisterDTOValidator : AbstractValidator<RegisterDTO>
    {
        public RegisterDTOValidator()
        {

            RuleFor(x => x.Username).NotEmpty().WithMessage("The UserName Can't be Null.");
            RuleFor(x => x.Email).NotEmpty().WithMessage("The Email Can't be Null.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("The Password Can't be Null.");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("The ConfirmPassword Can't be Null.");
        }
    }
}
