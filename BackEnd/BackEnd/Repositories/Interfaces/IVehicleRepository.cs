using AquaCars.DTOs.VechileDTOs;
using AquaCars.Models;

namespace AquaCars.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id);
        Task<List<Vehicle>> GetAllVehicles();
        Task<Vehicle> AddVehicle (Vehicle vehicle);
        Task<Vehicle> EditVehicle (Vehicle dto);
        Task<Vehicle> DeleteVehicle (Vehicle dto);
    }
}
