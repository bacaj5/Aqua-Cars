using AquaCars.DTOs.ReservationDTOs;
using FluentValidation;

namespace AquaCars.Validations.CategoryValidations
{
    public class AddReservationDTOValidator : AbstractValidator<AddReservationDTO>
    {
        public AddReservationDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Plotësoni Emrin.");

            RuleFor(x => x.SecondName).NotEmpty().WithMessage("Plotësoni Mbiemrin.");

            RuleFor(x => x.EMail).NotEmpty().WithMessage("Plotësoni E-Mail.");

            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Plotësoni Numrin Kontaktues.");

            RuleFor(x => x.NumberOfDays).NotEmpty().WithMessage("Plotësoni Numrin e Ditëve. Duhet të jetë më i madh se 0.");

            RuleFor(x => x.PickUpLocation).NotEmpty().WithMessage("Plotësoni Lokacionin e Marrjes së Veturës.");

            RuleFor(x => x.PickUpDate).NotEmpty().WithMessage("Plotësoni Datën e Marrjes së Veturës.");
            RuleFor(x => x.PickUpDate).Must(date => date >= DateTime.Today).WithMessage("Zgjidhni një datë të vlefshme për marrjen e veturës.");

            RuleFor(x => x.VehicleId).NotEmpty().WithMessage("The Vehicle Id Can't be Null!");
        }
    }
}