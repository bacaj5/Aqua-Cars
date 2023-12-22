using AquaCars.DTOs.ReservationDTOs;
using AquaCars.Models;

namespace AquaCars.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task<Reservation> GetReservation(int id);
        Task<List<Reservation>> GetAllReservations();
        Task<List<Reservation>> GetAllUserReservations(string email);
        Task<Reservation> AddReservation(Reservation dto);
        Task<Reservation> EditReservation(Reservation dto);
        Task<Reservation> DeleteReservation(Reservation dto);
    }
}