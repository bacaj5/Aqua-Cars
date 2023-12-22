using AquaCars.DTOs.SubCategoryDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class AddSubCategoryDTOValidator : AbstractValidator<AddSubCategoryDTO>
    {
        public AddSubCategoryDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("The Name Can't be Null!");
            RuleFor(x => x.CategoryId).NotEmpty().WithMessage("The Category Id Can't be Null!");
        }
    }
}
