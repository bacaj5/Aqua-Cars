using AquaCars.DTOs.VechileDTOs;
using AquaCars.Services.Interfaces;
using AquaCars.Utility.StaticData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AquaCars.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : Controller
    {
        private readonly IVehicleService _vehicleService;
        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var result = await _vehicleService.GetAllVehicles();
            return Ok(result);
        }

        [HttpGet("{vehicleId}")]
        public async Task<IActionResult> GetVehicleById(int vehicleId)
        {
            var result = await _vehicleService.GetVehicle(vehicleId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> AddVehicle([FromForm] AddVehicleDTO dto)
        {
            var result = await _vehicleService.AddVehicle(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPut]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> EditVehicle([FromForm] EditVehicleDTO dto)
        {
            var result = await _vehicleService.EditVehicle(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteVehicle(DeleteVehicleDTO dto)
        {
            var result = await _vehicleService.DeleteVehicle(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }
    }
}
