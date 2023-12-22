using AquaCars.DTOs.ReservationDTOs;
using AquaCars.Responses;

namespace AquaCars.Services.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationDTO> GetReservation(int id);
        Task<List<ReservationDTO>> GetAllReservations();
        Task<List<ReservationDTO>> GetAllUserReservations(string email);
        Task<ApiResponse> AddReservation(AddReservationDTO dto);
        Task<ApiResponse> EditReservation(EditReservationDTO dto);
        Task<ApiResponse> DeleteReservation(DeleteReservationDTO dto);
    }
}
