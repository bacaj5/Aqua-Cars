using System.ComponentModel.DataAnnotations;

namespace AquaCars.DTOs.IdentityDTOs
{
    public class RegisterDTO
    {
        public string Username { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

    }
}
