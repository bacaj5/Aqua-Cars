using AquaCars.DTOs.CategoryDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class EditCategoryDTOValidator : AbstractValidator<EditCategoryDTO>
    {
        public EditCategoryDTOValidator()
        {
            RuleFor(x=>x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty().WithMessage("The Category Name Can't be Null!");
        }
    }
}
