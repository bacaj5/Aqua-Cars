using AquaCars.DTOs.VechileDTOs;
using AquaCars.Responses;

namespace AquaCars.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<VehicleDTO> GetVehicle(int id);
        Task<List<VehicleDTO>> GetAllVehicles();
        Task<ApiResponse> AddVehicle(AddVehicleDTO dto);
        Task<ApiResponse> EditVehicle(EditVehicleDTO dto);
        Task<ApiResponse> DeleteVehicle(DeleteVehicleDTO dto);
    }
}
