using AquaCars.DTOs.IdentityDTOs;
using AquaCars.Responses;

namespace AquaCars.Repositories.Interfaces
{
    public interface IIdentityRepository
    {
        Task<ApiResponse> Register(RegisterDTO dto);
        Task<JwtResponse> Login(LoginDTO dto);
        Task<ApiResponse> ForgetPasswordAsync(string email);
        Task<ApiResponse> ResetPasswordAsync(ResetPasswordDTO dto);
        Task<UserDetailsDTO> GetUserDetailsAsync(string email);
        Task<List<UserDetailsDTO>> GetAllUsersDetailsAsync();
        Task<ApiResponse> EditUser(EditUserDTO dto);
        Task<ApiResponse> DeleteUser(DeleteUserDTO dto);
        Task<ApiResponse> DeleteUserByEmail(string email);

    }
}
