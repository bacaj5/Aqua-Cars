using AquaCars.DTOs.IdentityDTOs;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using FluentValidation;

namespace AquaCars.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly IIdentityRepository _identityRepository;
        private readonly IValidator<RegisterDTO> _registerValidator;
        private readonly IValidator<LoginDTO> _loginValidator;
        private readonly IValidator<ResetPasswordDTO> _resetValidator;

        public IdentityService(IIdentityRepository identityRepository, IValidator<RegisterDTO> registerValidator, IValidator<LoginDTO> loginValidator, IValidator<ResetPasswordDTO> resetValidator)
        {
            _identityRepository = identityRepository;
            _registerValidator = registerValidator;
            _loginValidator = loginValidator;
            _resetValidator = resetValidator;
        }

        public async Task<JwtResponse> Login(LoginDTO dto)
        {
            var result = _loginValidator.Validate(dto);
            if (!result.IsValid)
                return new JwtResponse(400, result.Errors[0].ToString());

            return await _identityRepository.Login(dto);
        }

        public async Task<ApiResponse> Register(RegisterDTO dto)
        {
            var result = _registerValidator.Validate(dto);
            if (!result.IsValid)
                return new ApiResponse(400, result.Errors[0].ToString());

            return await _identityRepository.Register(dto);
        }

        public async Task<ApiResponse> ForgetPasswordAsync(string email)
        {
            return await _identityRepository.ForgetPasswordAsync(email);
        }

        public async Task<ApiResponse> ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var result = _resetValidator.Validate(dto);
            if (!result.IsValid)
                return new ApiResponse(400, result.Errors[0].ToString());

            return await _identityRepository.ResetPasswordAsync(dto);
        }

        public async Task<UserDetailsDTO> GetUserDetailsAsync(string email)
        {
            return await _identityRepository.GetUserDetailsAsync(email);
        }

        public async Task<List<UserDetailsDTO>> GetAllUsersDetailsAsync()
        {
            return await _identityRepository.GetAllUsersDetailsAsync();
        }

        public async Task<ApiResponse> EditUser(EditUserDTO dto)
        {
            return await _identityRepository.EditUser(dto);
        }

        public async Task<ApiResponse> DeleteUser(DeleteUserDTO dto)
        {
            return await _identityRepository.DeleteUser(dto);
        }
        public async Task<ApiResponse> DeleteUserByEmail(string email)
        {
            return await _identityRepository.DeleteUserByEmail(email);
        }

    }
}
