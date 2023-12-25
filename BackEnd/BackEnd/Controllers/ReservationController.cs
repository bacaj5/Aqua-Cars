using AquaCars.DTOs.ReservationDTOs;
using AquaCars.Services.Interfaces;
using AquaCars.Utility.StaticData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AquaCars.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationController : Controller
    {
        private IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> GetAllReservations()
        {
            var result = await _reservationService.GetAllReservations();
            return Ok(result);
        }

        [HttpGet("{reservationId}")]
        public async Task<IActionResult> GetReservationById(int reservationId)
        {
            var result = await _reservationService.GetReservation(reservationId);
            return Ok(result);
        }

        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetAllUserReservations(string email)
        {
            var result = await _reservationService.GetAllUserReservations(email);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddReservation(AddReservationDTO dto)
        {
            var result = await _reservationService.AddReservation(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> EditReservation(EditReservationDTO dto)
        {
            var result = await _reservationService.EditReservation(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteReservation(DeleteReservationDTO dto)
        {
            var result = await _reservationService.DeleteReservation(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

    }
}
