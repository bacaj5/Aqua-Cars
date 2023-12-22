using AquaCars.DTOs.SubCategoryDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class EditSubCategoryDTOValidator : AbstractValidator<EditSubCategoryDTO>
    {
        public EditSubCategoryDTOValidator()
        {
            RuleFor(c => c.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty().WithMessage("The Name Can't be Null!");
            RuleFor(x => x.CategoryId).NotEmpty().WithMessage("The Category Id Can't be Null!");
        }

    }
}
