using AquaCars.DTOs.CategoryDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class AddCategoryDTOValidator : AbstractValidator<AddCategoryDTO>
    {
        public AddCategoryDTOValidator() 
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("The Category Name Can't be Null!");
        }
    }
}
