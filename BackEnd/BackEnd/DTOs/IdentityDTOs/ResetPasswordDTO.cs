using System.ComponentModel.DataAnnotations;

namespace AquaCars.DTOs.IdentityDTOs
{
    public class ResetPasswordDTO
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
    }
}
