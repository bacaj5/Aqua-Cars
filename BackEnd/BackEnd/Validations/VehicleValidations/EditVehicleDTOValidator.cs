using AquaCars.DTOs.VechileDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class EditVehicleDTOValidator : AbstractValidator<EditVehicleDTO>
    {
        public EditVehicleDTOValidator()
        {

            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Model).NotEmpty().WithMessage("The Model Can't be Null!");
            RuleFor(x => x.SubCategoryId).NotEmpty().WithMessage("The SubCategory Id Can't be Null!");
            RuleFor(x => x.KilometersPerHour).NotEmpty().WithMessage("The Kilometers Can't be Null!");
            RuleFor(x => x.ProdYear).NotEmpty().WithMessage("The Production Year Can't be Null!");
            RuleFor(x => x.PricePerDay).NotEmpty().WithMessage("The Price Per Day Can't be Null!");
            RuleFor(x => x.SeatingCapacity).NotEmpty().WithMessage("The Seating Capacity Can't be Null!");
            RuleFor(x => x.Engine).NotEmpty().WithMessage("The Engine Type Can't be Null!");
            RuleFor(x => x.Description).NotEmpty().WithMessage("The Description Can't be Null!");
        }
    }
}
