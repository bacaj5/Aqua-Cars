﻿using System.ComponentModel.DataAnnotations;

namespace AquaCars.DTOs.IdentityDTOs
{
    public class LoginDTO
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
