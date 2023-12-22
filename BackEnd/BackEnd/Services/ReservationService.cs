using AquaCars.DTOs.ReservationDTOs;
using AquaCars.Models;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using AutoMapper;
using FluentValidation;

namespace AquaCars.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddReservationDTO> _addValidator;
        private readonly IValidator<EditReservationDTO> _editValidator;

        public ReservationService(IReservationRepository reservationRepository, IVehicleRepository vehicleRepository, IMapper mapper, IValidator<AddReservationDTO> addValidator, IValidator<EditReservationDTO> editValidator)
        {
            _reservationRepository = reservationRepository;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
            _addValidator = addValidator;
            _editValidator = editValidator;
        }

        public async Task<ApiResponse> AddReservation(AddReservationDTO dto)
        {
            var validation = _addValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            var reservation = _mapper.Map<Reservation>(dto);

            var vehicle = await _vehicleRepository.GetVehicle(reservation.VehicleId);
            if (vehicle != null)
                reservation.TotalPay = reservation.NumberOfDays * vehicle.PricePerDay;

            var result = await _reservationRepository.AddReservation(reservation);

            if (result != null)
                return new ApiResponse(200, "The Reservation has been Added Succesfully.");

            return new ApiResponse(400, "The Reservation couldn't be Added Succesfully.");
        }

        public async Task<ApiResponse> DeleteReservation(DeleteReservationDTO dto)
        {
            if (dto == null)
                return new ApiResponse(400, "The Reservation could't be Deleted Succesfully.");

            var reservation = _mapper.Map<Reservation>(dto);
            var result = await _reservationRepository.DeleteReservation(reservation);

            if (result != null)
                return new ApiResponse(200, "The Reservation has been Deleted Succesfully.");

            return new ApiResponse(400, "The Reservation couldn't be Deleted Succesfully.");
        }

        public async Task<ApiResponse> EditReservation(EditReservationDTO dto)
        {
            var validation = _editValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            var reservation = await _reservationRepository.GetReservation(dto.Id);

            if (reservation != null)
            {
                reservation.Name = dto.Name;
                reservation.SecondName = dto.SecondName;
                reservation.EMail = dto.EMail;
                reservation.PhoneNumber = dto.PhoneNumber;
                reservation.NumberOfDays = dto.NumberOfDays;
                reservation.PickUpDate = dto.PickUpDate;
                reservation.PickUpLocation = dto.PickUpLocation;
                reservation.VehicleId = dto.VehicleId;
                reservation.LeaveAMessage = dto.LeaveAMessage;

                var vehicle = await _vehicleRepository.GetVehicle(dto.VehicleId);
                if (vehicle != null)
                    reservation.TotalPay = dto.NumberOfDays * vehicle.PricePerDay;
            }

            var result = await _reservationRepository.EditReservation(reservation);
            if (result != null)
                return new ApiResponse(200, "The Reservation has been Edited Succesfully.");

            return new ApiResponse(400, "The Reservation couldn't be Edited Succesfully.");
        }

        public async Task<List<ReservationDTO>> GetAllReservations()
        {
            var reservations = await _reservationRepository.GetAllReservations();
            var reservationsListDTO = _mapper.Map<List<ReservationDTO>>(reservations);
            return reservationsListDTO;
        }

        public async Task<List<ReservationDTO>> GetAllUserReservations(string email)
        {
            var reservations = await _reservationRepository.GetAllUserReservations(email);
            var reservationsListDTO = _mapper.Map<List<ReservationDTO>>(reservations);
            return reservationsListDTO;
        }

        public async Task<ReservationDTO> GetReservation(int id)
        {
            var reservation = await _reservationRepository.GetReservation(id);
            var reservationDTO = _mapper.Map<ReservationDTO>(reservation);
            return reservationDTO;
        }

    }
}