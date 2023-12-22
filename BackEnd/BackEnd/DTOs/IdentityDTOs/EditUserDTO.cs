using System.ComponentModel.DataAnnotations;

namespace AquaCars.DTOs.IdentityDTOs
{
    public class EditUserDTO
    {   
        public string Id { get; set; }
        public string UserName { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        public List<string> Roles { get; set; }
    }
}
