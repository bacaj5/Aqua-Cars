using AquaCars.DTOs.IdentityDTOs;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AquaCars.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly IIdentityService _identityService;   

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            var result = await _identityService.Register(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login ([FromBody] LoginDTO dto)
        {

            var result = await _identityService.Login(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpGet("ForgotPassword")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            var result = await _identityService.ForgetPasswordAsync(email);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswordAsync (ResetPasswordDTO dto)
        {
            var result = await _identityService.ResetPasswordAsync(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpGet("GetUserDetails")]
        [Authorize]
        public async Task<ActionResult> GetUserDetails(string email)
        {
            var result = await _identityService.GetUserDetailsAsync(email);
            return Ok(result);
        }

        [HttpGet("GetAllUsersDetails")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetAllUserDetails()
        {
            var result = await _identityService.GetAllUsersDetailsAsync();
            return Ok(result);
        }

        [HttpPut("EditUser")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditUser(EditUserDTO dto)
        {
            var result = await _identityService.EditUser(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("DeleteUser")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(DeleteUserDTO dto)
        {
            var result = await _identityService.DeleteUser(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("DeleteUserByEmail")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUserByEmail(string email)
        {
            var result = await _identityService.DeleteUserByEmail(email);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

    }
}
