using AquaCars.DTOs.IdentityDTOs;
using FluentValidation;

namespace AquaCars.Validations.IdentityValidations
{
    public class ResetPasswordDTOValidator : AbstractValidator<ResetPasswordDTO>
    {
        public ResetPasswordDTOValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("The Email Can't be Null.");
            RuleFor(x => x.NewPassword).NotEmpty().WithMessage("The New Password Can't be Null.");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("The ConfirmPassword Can't be Null.");
            RuleFor(x => x.Token).NotEmpty();
        }
    }
}
