using AquaCars.Models;
using AquaCars.Persistence;
using AquaCars.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AquaCars.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _context;

        public ReservationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Reservation> AddReservation(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<Reservation> DeleteReservation(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<Reservation> EditReservation(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
            return reservation;

        }

        public async Task<Reservation> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);
            return reservation;
        }

        public async Task<List<Reservation>> GetAllReservations()
        {
            List<Reservation> list = await _context.Reservations.ToListAsync();
            return list;
        }

        public async Task<List<Reservation>> GetAllUserReservations(string email)
        {
            List<Reservation> list = await _context.Reservations.Where(x => x.EMail == email).ToListAsync();
            return list;
        }

    }
}
