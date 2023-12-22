using AquaCars.DTOs.IdentityDTOs;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Utility.Interfaces;
using AquaCars.Utility.StaticData;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace AquaCars.Repositories
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public IdentityRepository(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator, IMapper mapper, IEmailSender emailSender, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _tokenGenerator = tokenGenerator;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        public async Task<ApiResponse> Register(RegisterDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user != null)
                return new ApiResponse(400, "This User Exists.");

            if (dto.Password != dto.ConfirmPassword)
                return new ApiResponse(400, "Password and Confirm Password do not Match.");

            var identityUser = _mapper.Map<IdentityUser>(dto);

            var result = await _userManager.CreateAsync(identityUser, dto.Password);
            if (!result.Succeeded)
                return new ApiResponse(400, "Something went Wrong.");

            var addingUser = await _userManager.AddToRoleAsync(identityUser, UserRoles.User);
            if (addingUser.Succeeded)
                return new ApiResponse(200, "User was Registered. Please Login!");

            return new ApiResponse(400, "Something went Wrong.");
        }

        public async Task<JwtResponse> Login(LoginDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return new JwtResponse(400, "Email was Incorrect.");

            var userPassword = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!userPassword)
                return new JwtResponse(400, "Password was Incorrect.");

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles != null)
            {
                var jwtToken = _tokenGenerator.GenerateJwtToken(user, userRoles.ToList());
                var tokenExpiration = DateTime.Now.AddMinutes(30);

                return new JwtResponse(200, "Successful Login.", jwtToken, tokenExpiration, userRoles.ToList());
            }

            return new JwtResponse(400, "Something Went Wrong.");
        }

        public async Task<ApiResponse> ForgetPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new ApiResponse(400, "No User Associated with this Email.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            string url = $"{"http://localhost:3000"}/ResetPassword/{email}/{validToken}";

            await _emailSender.SendEmailAsync(email, "Ndërro Fjalëkalimin",
                "Ndiqni udhëzimet për të ndërruar fjalëkalimin tuaj."
                 + $"<p>Për të ndërruar fjalëkalimin tuaj, <a href='{url}'>Kliko këtu</a>.</p>");

            return new ApiResponse(200, "Reset password URL has been sent to the email successfully!");
        }

        public async Task<ApiResponse> ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return new ApiResponse(400, "No User Associated with this Email.");

            if (dto.NewPassword != dto.ConfirmPassword)
                return new ApiResponse(400, "Passwords do not Match.");

            var decodedToken = WebEncoders.Base64UrlDecode(dto.Token);
            var normalToken = Encoding.UTF8.GetString(decodedToken);

            var resetPassword = await _userManager.ResetPasswordAsync(user, normalToken, dto.NewPassword);
            if (resetPassword.Succeeded)
                return new ApiResponse(200, "Password has been reset Succesfully.");

            return new ApiResponse(400, "Something went Wrong.");
        }

        public async Task<UserDetailsDTO> GetUserDetailsAsync(string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                throw new Exception("User not found");

            var roles = await _userManager.GetRolesAsync(user);
            var users = new UserDetailsDTO
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Roles = (List<string>)roles
            };
            return users;
        }
            
        public async Task<List<UserDetailsDTO>> GetAllUsersDetailsAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDetailsList = new List<UserDetailsDTO>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDetails = new UserDetailsDTO
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Password = user.PasswordHash,
                    Roles = roles.ToList()
                };
                userDetailsList.Add(userDetails);
            }
            return userDetailsList;
        }

        public async Task<ApiResponse> EditUser(EditUserDTO dto)
        {
            var user = await _userManager.FindByIdAsync(dto.Id);
            if (user == null)
                return new ApiResponse(400, "User not found.");

            user.UserName = dto.UserName;
            user.Email = dto.Email;

            //editing roles
            var allRolesExist = dto.Roles.All(role => _roleManager.RoleExistsAsync(role).Result);
            if (!allRolesExist)
                return new ApiResponse(400, "One or more roles specified do not exist.");

            var existingRoles = await _userManager.GetRolesAsync(user);
            var rolesToAdd = dto.Roles.Except(existingRoles);
            var rolesToRemove = existingRoles.Except(dto.Roles);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(dto.Password))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var passwordResetResult = await _userManager.ResetPasswordAsync(user, token, dto.Password);

                    if (!passwordResetResult.Succeeded)
                        return new ApiResponse(400, "Failed to update password.");
                }

                await _userManager.AddToRolesAsync(user, rolesToAdd);
                await _userManager.RemoveFromRolesAsync(user, rolesToRemove);
                return new ApiResponse(200, "User updated successfully.");
            }
            return new ApiResponse(400, "Failed to update user.");
        }

        public async Task<ApiResponse> DeleteUser(DeleteUserDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return new ApiResponse(400, "User Not Found.");

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isPasswordCorrect)
                return new ApiResponse(400, "Invalid email or password.");

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return new ApiResponse(400, "Failed to delete the user.");

            return new ApiResponse(200, "User Deleted Successfilly.");
        }

        public async Task<ApiResponse> DeleteUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new ApiResponse(400, "User Not Found.");

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return new ApiResponse(400, "Failed to delete the user.");

            return new ApiResponse(200, "User Deleted Successfilly.");
        }



    }
}
